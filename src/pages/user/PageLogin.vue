<template>
  <div class="Account-form">
    <el-form status-icon label-width="80px">
      <!--标题-->
      <h2 class="Account-title">系统登录</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <MyPhoneInput :phone-num="Phone" :required-check="false"/>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item label-width="13px">
        <router-view></router-view>
      </el-form-item>

      <el-link :underline="false" type="info" @click="verifyLoginHandle" id="withoutPass">{{ loginModel }}</el-link>&nbsp;

      <!--登录按钮-->
      <el-button :type="BtnState" @click="loginHandle" size="100px" id="Account-submit">登录</el-button>
      <!--协议同意-->
      <el-form-item label-width="13px">
        <MyProtocol/>
      </el-form-item>

      <el-form-item label-width="13px">
        <el-link :underline="false" type="info" @click="pushPage('r-resetVerify')">忘记密码</el-link>&nbsp;
        <el-link :underline="false" type="info" @click="pushPage('r-register')">快速注册</el-link>&nbsp;
        <el-link :underline="false" type="info">遇到问题</el-link>&nbsp;
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {prompts} from "@/mixin/mixin_prompt";
import {mixin_LoginAndRegister} from "@/mixin/mixin_LoginAndRegister";
import MyProtocol from "@/components/user/MyProtocol";
import {anyExcept} from "@/util/StringUtil";
import MyPhoneInput from "@/components/user/MyPhoneInput";
import {mapState, mapMutations} from "vuex";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";

export default {
  name: "PageLogin",
  data() {
    return {
      loginModel: '免密登录',
      loginModelMark: true, // 登录模式，用于切换密码登录-true 与 免密登录-false
    };
  },
  mixins: [mixin_LoginAndRegister, mixin_routerChange],
  components: {MyPhoneInput, MyProtocol},
  computed: {
    ...mapState('user', ['Phone', 'VerifyCode']),
  },
  methods: {
    ...mapMutations('user', ['setPhone', 'setVerifyCode', 'setUserName']),
    // 登录
    loginHandle() {
      if (!anyExcept(this.mark)) {
        return prompts.methods.warningPrompt("请输入信息并勾选协议");
      }
      // 裁决登录方式
      let url = this.loginModelMark ? '/user/pass_lg' : '/user/phone_lg';
      console.log("请求路径是:", url);
      let _this = this;
      this.$http({
        url: url,
        method: 'post',
        params: {
          phoneNumber: _this.Phone,
          verifyCode: _this.VerifyCode
        }
      }).then(function (data) {
        console.log("后端返回的数据是", data);
        if (data.data.state) {
          _this.setPhone(data.data.content.phoneNumber);
          _this.setUserName(data.data.content.name);
          _this.pushPage('r-container');
          prompts.methods.successPrompt(data.data.message);
        } else {
          prompts.methods.errorPrompt(data.data.message);
        }
      }).catch(function (data) {
        console.log("异常信息为:", data);
      });
    },
    // 切换登录方式
    verifyLoginHandle() {
      this.loginModelMark = !this.loginModelMark;
      this.resetAll();
      this.setVerifyCode('');
      this.$bus.$emit('setProtocolChecked', false);
      if (this.loginModelMark) {
        this.loginModel = '免密登录';
        this.replacePage('r-password');
      } else {
        this.loginModel = '密码登录';
        this.replacePage('r-verify');
      }
    }
  },
  // 挂载函数
  mounted() {
    // 初始化路由代理组件为MyPassword组件,并传递登录状态给MyPassword组件
    this.replacePage('r-password')
  }
}
</script>

<style scoped>

#withoutPass {
  margin-bottom: 10px;
  margin-left: 13px;
}

#Account-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
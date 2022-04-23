<template>
  <div class="Account-form">
    <el-form status-icon label-width="80px">
      <!--标题-->
      <h2 class="Account-title">用户注册</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <MyPhoneInput :requiredCheck="true"/>
      </el-form-item>

      <!--验证码栏-->
      <el-form-item label-width="13px">
        <MyVerify ref="myVerify" :phone="Phone"/>
      </el-form-item>

      <!--注册按钮-->
      <el-button :type="BtnState" @click="registerHandle" size="100px" id="Account-submit">快速注册</el-button>

      <!--协议同意-->
      <el-form-item label-width="13px">
        <MyProtocol/>
      </el-form-item>

      <el-form-item label-width="13px">
        <el-link :underline="false" type="info" @click="pushPage('r-login')">直接登录</el-link>&nbsp;
        <el-link :underline="false" type="info">遇到问题</el-link>&nbsp;
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mixin_LoginAndRegister} from "@/mixin/mixin_LoginAndRegister";
import MyVerify from "@/components/user/MyVerify";
import MyProtocol from "@/components/user/MyProtocol";
import MyPhoneInput from "@/components/user/MyPhoneInput";
import {anyExcept} from "@/util/StringUtil";
import {prompts} from "@/mixin/mixin_prompt";
import {mapState, mapMutations} from "vuex";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";

export default {
  name: "PageRegistration",
  mixins: [mixin_LoginAndRegister, mixin_routerChange],
  components: {
    MyPhoneInput, MyVerify, MyProtocol
  },
  computed: {
    ...mapState('user', ['Phone', 'VerifyCode']),
  },
  methods: {
    ...mapMutations('user', ['setVerifyCode']),
    // 快速注册
    registerHandle() {
      let _this = this;
      if (!anyExcept(this.mark)) {
        return prompts.methods.warningPrompt("请输入信息并勾选协议");
      }
      _this.$http({
        method: 'post',
        url: '/user/phone_rg',
        params: {
          phoneNumber: this.Phone,
          verifyCode: this.VerifyCode
        }
      }).then(function (data) {
        console.log("后端返回的数据是", data);
        if (data.data.state) {
          prompts.methods.successPrompt('注册成功,请完善账号');
          _this.pushPage('r-perfect');
        } else {
          prompts.methods.errorPrompt("验证码错误");
        }
      });
      this.setVerifyCode('');
    }
  }
}
</script>

<style scoped>

/*标题样式*/
#Account-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
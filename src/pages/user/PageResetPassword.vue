<template>
  <div class="Account-form">
    <el-form status-icon label-width="80px">
      <!--标题-->
      <h2 class="Account-title">重置密码</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <MyPhoneInput :auth="true" :requiredCheck="false"/>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item label-width="13px">
        <router-view></router-view>
      </el-form-item>

      <!--确认按钮-->
      <el-button :type="BtnStateUp" @click="commitHandle" size="100px" id="Account-submit">确认修改</el-button>
    </el-form>
  </div>
</template>

<script>
import {mixin_LoginAndRegister} from "@/mixin/mixin_LoginAndRegister";
import {mapMutations, mapState} from "vuex";
import {prompts} from "@/mixin/mixin_prompt";
import MyPhoneInput from "@/components/user/MyPhoneInput";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";

export default {
  name: "PageResetPassword",
  mixins: [mixin_LoginAndRegister, mixin_routerChange],
  data() {
    return {
      switched: false, // 默认为未被切换的
      url: '/user/verify/codeAuthCheck', // 默认请求路径为检查验证码与序列化权限码
    }
  },
  components: {
    MyPhoneInput
  },
  methods: {
    ...mapMutations('user', ['setVerifyCode', 'setPhone']),
    commitHandle() {
      // 裁决登录方式
      let _this = this;
      this.$http({
        method: 'post',
        url: _this.url,
        params: {
          phoneNumber: _this.Phone,
          verifyCode: _this.VerifyCode,
          authorityCode: _this.SerializedCode
        }
      }).then(function (data) {
        console.log("后端返回的数据是", data);
        if (data.data.state) {
          if (!_this.switched) {
            _this.switched = !_this.switched;
            _this.url = '/user/reset_rg';
            _this.pushPage('r-use-pass');
          } else {
            _this.replacePage('r-login');
            _this.setPhone('');
          }
          prompts.methods.successPrompt(data.data.message);
        } else {
          prompts.methods.errorPrompt(data.data.message);
        }
      }).catch(function (data) {
        console.log("异常信息为:", data);
      });
      this.setVerifyCode('');
    }
  },
  computed: {
    ...mapState('user', ['Phone', 'VerifyCode', 'SerializedCode']),
    BtnStateUp() {
      if (this.Phone !== '' && this.VerifyCode !== '') {
        return 'success';
      } else {
        return 'info';
      }
    }
  },
  mounted() {
    // 初始化路由代理组件为MyPassword组件,并传递登录状态给MyPassword组件
    this.replacePage('r-use-verify')
  }
}
</script>

<style scoped>

#Account-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
<template>
  <div class="register-form">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="login-form">
      <!--标题-->
      <h2 class="register-title">用户注册</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <MyPhoneInput :requiredSwitch="true"/>
      </el-form-item>

      <!--验证码栏-->
      <el-form-item label-width="13px">
        <MyVerify ref="myVerify" :phone="ruleForm.phone"/>
      </el-form-item>

      <!--注册按钮-->
      <el-button :type="BtnState" @click="registerHandle" size="100px" id="register-submit">快速注册</el-button>

      <!--协议同意-->
      <el-form-item label-width="13px">
        <MyProtocol/>
      </el-form-item>

      <el-form-item label-width="13px">
        <el-link :underline="false" type="info" @click="toLoginPage">直接登录</el-link>&nbsp;
        <el-link :underline="false" type="info">遇到问题</el-link>&nbsp;
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mixin_LoginAndRegister} from "@/util/mixin_LoginAndRegister";
import MyVerify from "@/components/MyVerify";
import MyProtocol from "@/components/MyProtocol";
import MyPhoneInput from "@/components/MyPhoneInput";
import {anyExcept} from "@/util/StringUtil";
import {prompts} from "@/util/mixin_prompt";
import {mapState,mapMutations} from "vuex";

export default {
  name: "PageRegistration",
  mixins: [mixin_LoginAndRegister],
  components: {
    MyPhoneInput, MyVerify, MyProtocol
  },
  data() {
    return {
      ruleForm: {
        verify: ''
      }
    };
  },
  computed:{
    ...mapState('user',['Phone']),
  },
  methods: {
    ...mapMutations('user',['updatePhone']),
    // 跳转至登录页面
    toLoginPage() {
      this.$router.push({
        name: 'r-login'
      });
    },
    // 快速注册
    registerHandle() {
      let _this = this;
      if (!anyExcept(this.mark)) {
        return prompts.methods.warningPrompt("请输入信息并勾选协议");
      }
      _this.$http({
        url: '/user/phone_rg',
        method: 'post',
        params: {
          phoneNumber: this.Phone,
          verifyCode: this.verifyCode
        }
      }).then(function (data) {
        console.log("后端返回的数据是", data);
        if (data.data.state) {
          prompts.methods.successPrompt('注册成功,正在跳转至登录页面');
          _this.$router.push({
            name: 'r-login'
          });
        } else {
          prompts.methods.errorPrompt("验证码错误");
          _this.updatePhone('');
          _this.verifyCode = '';
        }
      });
    }
  }
}
</script>

<style scoped>
/*表单整体样式*/
.register-form {
  background-clip: padding-box;
  margin: 180px auto;
  width: 300px;
  height: 360px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaec;
  box-shadow: 0 0 20px #2e3644;
  /*设置圆角边框*/
  border-radius: 7px;
}

/*标题样式*/
.register-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #1fb5ac;
}

#register-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
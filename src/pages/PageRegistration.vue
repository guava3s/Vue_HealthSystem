<template>
  <div class="register-form">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="login-form">
      <!--标题-->
      <h2 class="register-title">用户注册</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <PhoneInput/>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item label-width="13px">
        <MyVerify/>
      </el-form-item>

      <!--注册按钮-->
      <el-button :type="loginBtnState" @click="registerHandle" size="100px" id="register-submit">快速注册</el-button>

      <el-form-item label-width="13px">
        <el-checkbox v-model="ruleForm.check" id="check">
          我已阅读并同意
          <el-button :underline="false" type="text">《健康服务协议》</el-button>
        </el-checkbox>
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
import PhoneInput from "@/components/PhoneInput";
import MyVerify from "@/components/MyVerify";

export default {
  name: "PageRegistration",
  mixins: [mixin_LoginAndRegister],
  components: {
    MyVerify,
    PhoneInput
  },
  data(){
    return {
      loginBtnState: 'info',
      loginModelMark: false,
      mark: { // 标记属性
        markOther: false, // 标记短信验证码
      },
      ruleForm: {
        verify:''
      },
    };
  },
  methods: {
    // 跳转至登录页面
    toLoginPage() {
      this.$router.push({
        name: 'r-login'
      });
    },
    // 快速注册
    registerHandle(){

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

/*复选框字体颜色*/
#check {
  color: darkgrey;
}
</style>
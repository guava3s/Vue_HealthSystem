<template>
  <div class="login-body">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="login-form">
      <!--标题-->
      <h2 class="login-title">系统登录</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <PhoneInput/>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item label-width="13px">
        <router-view></router-view>
      </el-form-item>

      <el-link :underline="false" type="info" @click="verifyLoginHandle" id="withoutPass">{{ loginModel }}</el-link>&nbsp;
      <br>
      <!--登录按钮-->
      <el-button :type="BtnState" @click="loginHandle" size="100px" id="login-submit">登录</el-button>

      <!--协议同意-->
      <el-form-item label-width="13px">
        <MyProtocol/>
      </el-form-item>

      <el-form-item label-width="13px">
        <el-link :underline="false" type="info">忘记密码</el-link>&nbsp;
        <el-link :underline="false" type="info" @click="toRegisterPage">快速注册</el-link>&nbsp;
        <el-link :underline="false" type="info">遇到问题</el-link>&nbsp;
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {prompts} from "@/util/mixin_prompt";
import {mixin_LoginAndRegister} from "@/util/mixin_LoginAndRegister";
import PhoneInput from "@/components/MyPhoneInput";
import MyProtocol from "@/components/MyProtocol";
import {anyExcept} from "@/util/StringUtil";

export default {
  name: "PageLogin",
  data() {
    return {
      loginState: 'el-icon-lock', // 登录状态
      loginModel: '免密登录',
      loginModelMark: false,
      ruleForm: {
        pass: '',
      },
    };
  },
  mixins: [mixin_LoginAndRegister],
  components: {PhoneInput, MyProtocol},
  methods: {
    // 登录
    loginHandle() {
      if (!anyExcept(this.mark)) {
        return prompts.methods.warningPrompt("请输入信息并勾选协议");
      }
      // 修改登录图标 为登录中
      this.loginState = 'el-icon-loading';
      // 裁决登录方式
      let url = '/user/phone_lg';
      if (this.ruleForm.pass !== '') {
        url = '/user/pass_lg';
      }
      console.log("请求路径是:", url);
      // 登录请求简写形式
      let _this = this;
      // this.$http.post(url, {
      //   phoneNumber: _this.ruleForm.phone,
      //   verifyCode: _this.verifyCode
      // }).then(function (response) {
      //   console.log("后端返回的数据是", response);
      //   prompts.methods.successPrompt(response.data.content);
      //   _this.$router.push({
      //     name: 'r-container'
      //   });
      // }).catch(function (error) {
      //   console.log("异常信息为:", error);
      //   prompts.methods.errorPrompt('登录失败');
      // });
      this.$http({
        url: url,
        method: 'post',
        params: {
          phoneNumber: this.ruleForm.phone,
          verifyCode: this.verifyCode
        }
      }).then(function (data) {
        console.log("后端返回的数据是", data);
        if (data.data.message === '登录成功') {
          prompts.methods.successPrompt(data.data.message);
          // 需要先获取到成功数据才能提示成功
          // 在这里要注意this不是VC实例对象，需要从外部赋值
          _this.$router.push({
            name: 'r-container'
          });
        } else {
          prompts.methods.errorPrompt("用户名或密码错误");
        }
      }).catch(function (data) {
        console.log("异常信息为:", data);
      });
    },
    // 跳转到注册页面
    toRegisterPage() {
      this.$router.push({
        name: 'r-register'
      });
    },
    // 点击事件:免密登录
    verifyLoginHandle() {
      this.loginModelMark = !this.loginModelMark;
      if (this.loginModelMark) {
        this.loginModel = '密码登录';
        this.$router.replace({
          name: 'r-verify',
          params: {
            phone: this.ruleForm.phone
          }
        });
      } else {
        this.loginModel = '免密登录';
        this.$router.replace({
          name: 'r-password',
          params: {
            state: this.loginState
          }
        });
      }
    },
    // 从MyPassword组件中获取用户输入的密码
    getPassword(pd) {
      this.ruleForm.pass = pd;
      this.verifyCode = pd;
      this.mark.markOther = pd !== '';
    }
  },
  // 挂载函数
  mounted() {
    // 绑定返回密码事件
    this.$bus.$on('returnPassWord', this.getPassword);
    // 初始化路由代理组件为MyPassword组件,并传递登录状态给MyPassword组件
    this.$router.replace({
      name: 'r-password',
      params: {
        state: this.loginState
      }
    });
  },
  // 销毁函数
  beforeDestroy() {
    // 解除事件绑定
    this.$bus.$off('returnPassWord');
  }
}
</script>

<style scoped>

/*表单整体样式*/
.login-form {
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
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #1fb5ac;
}

#withoutPass {
  margin-bottom: 10px;
  margin-left: 13px;
}

#login-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
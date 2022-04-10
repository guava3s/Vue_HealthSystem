<template>
  <div class="login-body">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="login-form">
      <!--标题-->
      <h2 class="login-title">系统登录</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <el-input type="text" placeholder="请输入手机号" v-model="ruleForm.phone" autocomplete="off">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item label-width="13px">
        <router-view></router-view>
      </el-form-item>

      <el-link :underline="false" type="info" @click="verifyLoginHandle" id="withoutPass">免密登录</el-link>&nbsp;
      <br>
      <!--登录按钮-->
      <el-button :type="loginBtnState" @click="loginHandle" size="100px" id="login-submit">登录</el-button>

      <el-form-item label-width="13px">
        <el-checkbox v-model="ruleForm.check" id="check">
          我已阅读并同意
          <el-button :underline="false" type="text">《健康隐私协议》</el-button>
        </el-checkbox>
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
import {anyNull} from "@/util/StringUtil";
import {success} from "@/util/prompt";
import {background} from "@/util/background";

export default {
  name: "PageLogin",
  data() {
    return {

      loginState: 'el-icon-lock', // 登录状态
      loginBtnState: 'info',
      ruleForm: {
        pass: '',
        check: '',
        phone: '',
      }
    };
  },
  mixins: [success, background],
  methods: {
    // 登录
    loginHandle() {
      if (anyNull(this.ruleForm)) {
        return alert("请填写完整");
      } else {
        // 修改登录图标 为登录中
        this.loginState = 'el-icon-loading';
        console.log("PageLogin组件 ruleForm.phone为：", this.ruleForm.phone);
        console.log("PageLogin组件 ruleForm.pass为：", this.ruleForm.pass);
        // 登录请求
        this.$http({
          url: '/user/pass_lg',
          method: 'post',
          params: {
            phoneNumber: this.ruleForm.phone,
            password: this.ruleForm.pass
          }
        }).then(function (data) {
          console.log("后端返回的数据是", data);
          success.methods.successPrompt('登录成功');
        }).catch(function (data) {
          console.log("异常信息为:", data);
        });
      }
    },
    // 跳转到注册页面
    toRegisterPage() {
      this.$router.push({
        name: 'r-register'
      });
    },
    // 免密登录
    verifyLoginHandle() {
      this.$router.replace({
        name: 'r-verify',
        params: {
          phone: this.ruleForm.phone
        }
      });
    },
    // 从MyPassword组件中获取用户输入的密码
    getPassword(pd) {
      this.ruleForm.pass = pd;
    }
  },
  // 挂载函数
  mounted() {
    // 绑定返回密码事件
    this.$bus.$on('returnPassWord', this.getPassword);
    // 初始化路由代理组件为MyPassword组件
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
    console.log("已销毁");
  }
}

</script>

<style scoped>

/*表单整体样式*/
.login-form {
  background-clip: padding-box;
  margin: 180px auto;
  width: 300px;
  height: 370px;
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

/*提交按钮样式*/
.login-submit {
  margin: 10px auto 20px;
  /*设置圆角边框*/
  border-radius: 7px;
}

/*复选框字体颜色*/
#check {
  color: darkgrey;
}

#withoutPass {
  margin-top: 0px;
  margin-bottom: 10px;
  margin-left: 13px;
}

#login-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
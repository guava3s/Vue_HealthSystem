<template>
  <div class="login-body">
    <el-form :model="ruleForm"
             status-icon :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="login-form">
      <!--标题-->
      <h2 class="login-title">系统登录</h2>
      <!--手机栏-->
      <el-form-item class="item-text" prop="phone" label-width="13px">
        <el-input type="text"
                  v-model="ruleForm.phone"
                  autocomplete="off"
                  placeholder="请输入手机号"
                  prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>

      <!--密码栏 / 验证码栏-->
      <el-form-item prop="pass" label-width="13px">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"
                  placeholder="请输入密码"
                  :prefix-icon="loginState">
        </el-input>
      </el-form-item>

      <!--登录按钮-->
      <el-form-item class="login-submit" label-width="13px">
        <el-button :type="loginBtnState" @click="loginHandle" size="100px">登录</el-button>
        <!--        <el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>

      <el-form-item label-width="13px">
        <el-checkbox v-model="ruleForm.check" id="check">
          我已阅读并同意
          <el-link :underline="false" type="warning">《健康隐私协议》</el-link>
        </el-checkbox>
      </el-form-item>

      <el-form-item label-width="13px">
        <el-link :underline="false" @click="verifyLoginHandle" type="warning" id="withoutPass">免密登录</el-link>&nbsp;
        <el-link :underline="false" type="warning">忘记密码</el-link>&nbsp;
        <el-link :underline="false" type="warning" @click="registerHandle">快速注册</el-link>&nbsp;
        <el-link :underline="false" type="warning">遇到问题</el-link>&nbsp;
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import {anyNull} from "@/util/StringUtil";
import {Message} from 'element-ui';

export default {
  name: "PageLogin",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
    };
    return {
      loginState: 'el-icon-lock', // 登录状态
      loginBtnState: 'info',
      ruleForm: {
        pass: '',
        check: '',
        phone: '',
      },
      rules: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    loginHandle() {
      if (anyNull(this.ruleForm)) {
        return alert("请填写完整");
      } else {
        // 修改登录状态为登录中
        this.loginState = 'el-icon-loading';
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
          Message({
            message: data.message,
            type: 'success'
          });
        });
      }
    },
    // 注册
    registerHandle() {

    },
    // 免密登录
    verifyLoginHandle() {
      // this.$router.replace({
      //   name: 'r-password'
      // });
    }
  },
  // 挂载函数
  mounted() {
    // 挂载该组件后设置背景图片为background.jpg
    document.querySelector('body').setAttribute('style', "background-image: url(" + require("../../static/background.jpg") + ");background-size: cover;" +
        "background-repeat: no-repeat")
  },
  // 销毁函数
  beforeDestroy() {
    // 在销毁该组件前撤销背景图片
    document.querySelector('body').removeAttribute('style')
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

/*提交按钮样式*/
.login-submit {
  /*width: 100px;*/
  size: 100px;
  margin: 10px auto 20px;
}

/*复选框字体颜色*/
#check {
  color: orange;
}

#withoutPass {
  margin-top: 0px;
  margin-bottom: 2px;
}
</style>
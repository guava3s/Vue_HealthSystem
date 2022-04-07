<template>
  <el-form :model="ruleForm"
           status-icon :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="login-form">
    <h2 class="login-title">系统登录</h2>
    <el-form-item class="login-body-text" label="手机号" prop="phone">
      <el-input type="text" v-model="ruleForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item class="login-body-text" label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="success" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-link type="primary" underline>忘记密码</el-link>
      |
      <el-link type="primary" @click="registration" underline>快速注册</el-link>
      |
      <el-link type="primary" underline>遇到问题</el-link>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "PageLogin",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: '',
        phone: ''
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
    login() {
      let _this = this;
      // 使用别名配置请求
      this.$http.post('/user/login', {
        phoneNumber: _this.ruleForm.phone,
        password: _this.ruleForm.pass
      }).then(function (data) {
        console.log(data);
      }).catch(function (error) {
        console.log(error);
      });
    },
    registration() {

    }
  }
}

</script>

<style scoped>
.login-form {
  border-right: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 360px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 20px;
}

.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: purple;
}

.login-submit {
  margin: 10px auto 0px;
}
</style>
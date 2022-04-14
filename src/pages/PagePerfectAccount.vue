<template>
  <div class="perfect-form">
    <el-form status-icon ref="ruleForm" label-width="80px" class="login-form">
      <!--标题-->
      <h2 class="perfect-title">完善账号</h2>
      <h3 class="perfect-title">填写昵称和密码</h3>

      <!--昵称栏-->
      <el-form-item class="item-text" label-width="13px">
        <el-input type="text" placeholder="请输入昵称" v-model="username" autocomplete="off"></el-input>
      </el-form-item>

      <!--密码栏-->
      <el-form-item label-width="13px">
        <MyPassword ref="myPassword" :model="false" @change.native="formatCheck"/>
      </el-form-item>

      <!--确认按钮-->
      <el-button :type="BtnStateUp" @click="commitHandle" size="100px" id="perfect-submit">确认</el-button>
    </el-form>

  </div>
</template>

<script>
import MyPassword from "@/components/MyPassword";
import {mixin_LoginAndRegister} from "@/util/mixin_LoginAndRegister";
import {mapState} from "vuex";
import {prompts} from "@/util/mixin_prompt";

export default {
  name: "PagePerfectAccount",
  components: {MyPassword},
  mixins: [mixin_LoginAndRegister],
  data() {
    return {
      username: ''
    }
  },
  methods: {
    commitHandle() {
      if (this.username !== '' && this.verifyCode !== '') {
        let _this = this;
        this.$http({
          url: '/user/perfect_rg',
          method: 'post',
          params: {
            name: this.username,
            phoneNumber: this.Phone,
            verifyCode: this.verifyCode
          }
        }).then(function (data) {
          if (data.data.state) {
            prompts.methods.successPrompt(data.data.message);
          }
          // 跳转至登录页面
          _this.$router.replace({
            name: 'r-login'
          });
        });
      } else {
        prompts.methods.errorPrompt('请输入信息');
      }

    },
    formatCheck() {
      console.log(this);
      if (this.$refs.myPassword.password.length < 6) {
        prompts.methods.errorPrompt('密码长度小于6,请重新输入');
        this.$bus.$emit('setPassword', '');
      }
    }
  },
  computed: {
    ...mapState('user', ['Phone']),
    BtnStateUp() {
      if (this.username !== '' && this.verifyCode !== '') {
        return 'success';
      } else {
        return 'info';
      }
    }
  }
}
</script>

<style scoped>
/*表单整体样式*/
.perfect-form {
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
.perfect-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #1fb5ac;
}

#perfect-submit {
  margin-top: 3px;
  margin-left: 13px;
  width: 286px;
}
</style>
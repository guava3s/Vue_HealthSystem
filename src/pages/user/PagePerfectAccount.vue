<template>
  <div class="Account-form">
    <el-form status-icon label-width="80px">
      <!--标题-->
      <h2 class="Account-title">完善账号</h2>
      <h3 class="Account-title">填写昵称和密码</h3>

      <!--昵称栏-->
      <el-form-item class="item-text" label-width="13px">
        <el-input type="text" placeholder="请输入昵称" v-model="username" autocomplete="off"></el-input>
      </el-form-item>

      <!--密码栏-->
      <el-form-item label-width="13px">
        <MyPassword ref="myPassword" :model="false" @change.native="formatCheck"/>
      </el-form-item>

      <!--确认按钮-->
      <el-button :type="BtnStateUp" @click="commitHandle" size="100px" id="Account-submit">确认</el-button>
    </el-form>

  </div>
</template>

<script>
import MyPassword from "@/components/MyPassword";
import {mixin_LoginAndRegister} from "@/util/mixin_LoginAndRegister";
import {mapMutations, mapState} from "vuex";
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
  computed: {
    ...mapState('user', ['Phone', 'VerifyCode']),
    BtnStateUp() {
      if (this.username !== '' && this.VerifyCode !== '') {
        return 'success';
      } else {
        return 'info';
      }
    }
  },
  methods: {
    ...mapMutations('user', ['flushAllProperty', 'setVerifyCode']),
    // 确认并提交
    commitHandle() {
      if (this.username !== '' && this.VerifyCode !== '') {
        let _this = this;
        this.$http({
          url: '/user/perfect_rg',
          method: 'post',
          params: {
            name: this.username,
            phoneNumber: this.Phone,
            verifyCode: this.VerifyCode
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
      // 清空仓库所有数据
      this.flushAllProperty('');
    },
    formatCheck() {
      if (this.$refs.myPassword.password.length < 6) {
        this.$refs.myPassword.password = '';
        this.setVerifyCode('');
        return prompts.methods.errorPrompt('密码长度小于6,请重新输入');
      }
    }
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
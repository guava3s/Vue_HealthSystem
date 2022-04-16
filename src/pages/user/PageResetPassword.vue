<template>
  <div class="Account-form">
    <el-form status-icon ref="ruleForm" label-width="80px">
      <!--标题-->
      <h2 class="Account-title">重置密码</h2>

      <!--手机栏-->
      <el-form-item class="item-text" label-width="13px">
        <MyPhoneInput/>
      </el-form-item>

      <!--密码栏-->
      <el-form-item label-width="13px">
        <MyPassword/>
      </el-form-item>

      <!--验证码栏-->
      <el-form-item label-width="13px">
        <MyVerify/>
      </el-form-item>

      <!--确认按钮-->
      <el-button :type="BtnStateUp" @click="commitHandle" size="100px" id="Account-submit">确认修改</el-button>
    </el-form>

  </div>
</template>

<script>
import {mixin_LoginAndRegister} from "@/util/mixin_LoginAndRegister";
import {mapState} from "vuex";
import MyVerify from "@/components/MyVerify";
import MyPassword from "@/components/MyPassword";
import MyPhoneInput from "@/components/MyPhoneInput";

export default {
  name: "PageResetPassword",
  mixins: [mixin_LoginAndRegister],
  data() {
    return {
      phoneNum: ''
    }
  },
  components: {
    MyPhoneInput, MyVerify, MyPassword
  },
  methods: {
    commitHandle() {

    }
  },
  computed: {
    ...mapState('user', ['Phone']),
    BtnStateUp() {
      return '';
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
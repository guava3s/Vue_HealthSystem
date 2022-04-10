<template>
  <div>
    <el-input id="login-verify-code" placeholder="6 位短信验证码" v-model="phoneNumber">
      <el-button id="login-verify-send" slot="append" @click="getCode" :disabled="state">{{ content }}</el-button>
    </el-input>
  </div>
</template>

<script>


import {success} from "@/util/prompt";

export default {
  name: "MyVerify",
  data() {
    return {
      content: '获取验证码',
      phoneNumber: this.phone,
      state: false,
      totalTime: 60
    }
  },
  props: ['phone'],
  methods: {
    getCode() {
      success.methods.successPrompt('发送成功');
      // 60s倒数
      this.state = true;//点击之后设置按钮不可取
      this.content = this.totalTime + "s";//按钮内文本
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "获取验证码";
          this.totalTime = 60;
          this.state = false; //这里重新开启
        }
      }, 1000);
      console.log("MyVerify组件 phone为：", this.phone);
      console.log("向后端请求验证码");
    }
  },
  mixins: [success]
}
</script>

<style>

</style>
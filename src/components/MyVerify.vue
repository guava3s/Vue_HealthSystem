<template>
  <el-input id="login-verify-code" placeholder="6 位短信验证码" v-model="code">
    <el-button id="login-verify-send" slot="append" @click="getCode" :disabled="state">{{ content }}</el-button>
  </el-input>
</template>

<script>

import {prompts} from "@/util/mixin_prompt";

export default {
  name: "MyVerify",
  mixins: [prompts],
  props: ['phone'],
  data() {
    return {
      content: '获取验证码',
      code: '',
      phoneNumber: this.phone,
      state: false,
      totalTime: 60
    }
  },
  methods: {
    getCode() {
      console.log(this.phone);
      if (this.phoneNumber === '') {
        return prompts.methods.warningPrompt('手机号不能为空');
      }
      this.$http({
        url: '/user/code',
        method: 'get',
        params: {
          phoneNumber: this.phoneNumber
        }
      }).then(function (data) {
        console.log(data);
        prompts.methods.successPrompt('发送成功');
      });
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
    },
    // 更新手机号
    updatePhoneNumber(phone) {
      this.phoneNumber = phone;
    }
  },
  watch: {
    // 监听验证码属性
    code(newValue) {
      this.$bus.$emit('returnVerifyCode', newValue);
    }
  },
  mounted() {
    // 绑定事件
    this.$bus.$on('updatePhoneNumber', this.updatePhoneNumber);
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off('updatePhoneNumber');
  }
}
</script>

<style>

</style>
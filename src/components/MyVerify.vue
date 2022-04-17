<template>
  <el-input id="login-verify-code" placeholder="6 位短信验证码" v-model="verifyCode">
    <el-button id="login-verify-send" slot="append" @click="getCodeHandle" :disabled="disabled">{{ content }}</el-button>
  </el-input>
</template>

<script>

import {prompts} from "@/util/mixin_prompt";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "MyVerify",
  mixins: [prompts],
  props: ['phone'],
  data() {
    return {
      content: '获取验证码',
      verifyCode: '', // 验证码
      disabled: false,
      totalTime: 60
    }
  },
  computed: {
    ...mapState('user', ['Phone'])
  },
  methods: {
    ...mapActions('user', ['updateVerifyCodeAndSend']),
    ...mapMutations('user', ['setVerifyCode']),
    getCodeHandle() {
      if (this.Phone === '') {
        return prompts.methods.warningPrompt('手机号不能为空');
      }
      prompts.methods.successPrompt('发送成功');
      // 更新验证码并发送手机号到后端校验
      this.updateVerifyCodeAndSend(this.verifyCode);
      // 60s倒数
      this.disabled = true;//点击之后设置按钮不可取
      this.content = this.totalTime + "s";//按钮内文本
      let clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s";
        if (this.totalTime < 0) {
          window.clearInterval(clock);
          this.content = "获取验证码";
          this.totalTime = 60;
          this.disabled = false; //这里重新开启
        }
      }, 1000);
    }
  },
  watch: {
    // 监听验证码属性
    verifyCode(newValue) {
      this.setVerifyCode(newValue);
      this.$bus.$emit('setVerifyState', newValue);
    }
  }
}
</script>
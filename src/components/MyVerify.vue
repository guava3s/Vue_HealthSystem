<template>
  <el-input id="login-verify-code" placeholder="6 位短信验证码" v-model="code">
    <el-button id="login-verify-send" slot="append" @click="getCode" :disabled="state">{{ content }}</el-button>
  </el-input>
</template>

<script>

import {prompts} from "@/util/mixin_prompt";
import {mapState} from "vuex";

export default {
  name: "MyVerify",
  mixins: [prompts],
  props: ['phone'],
  data() {
    return {
      content: '获取验证码',
      code: '', // 验证码
      state: false,
      totalTime: 60
    }
  },
  computed: {
    ...mapState('user', ['Phone'])
  },
  methods: {
    getCode() {
      console.log();
      if (this.Phone === '') {
        return prompts.methods.warningPrompt('手机号不能为空');
      }
      this.$http({
        url: '/user/verify/code',
        method: 'get',
        params: {
          phoneNumber: this.Phone
        }
      }).then(function (data) {
        console.log(data);
        if (data.data.state) {
          prompts.methods.successPrompt('发送成功');
        } else {
          prompts.methods.warningPrompt(data.data.message);
        }
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
    // 更新发送键状态
    updateKeyState(state) {
      this.state = state;
    }
  },
  watch: {
    // 监听验证码属性
    code(newValue) {
      this.$bus.$emit('setVerifyCode', newValue);
    }
  },
  mounted() {
    // 绑定事件
    this.$bus.$on('updateKeyState', this.updateKeyState);
  },
  beforeDestroy() {
    // 解绑事件
    this.$bus.$off('updateState');
  }
}
</script>

<style>

</style>
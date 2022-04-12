<template>
  <el-input type="text" :placeholder="inp" v-model="phoneNumber" autocomplete="off" @change="checkNumber">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
import {prompts} from "@/util/mixin_prompt";

export default {
  name: "MyPhoneInput",
  data() {
    return {
      inp: '请输入11位手机号',
      phoneNumber: ''
    }
  },
  watch: {
    // 监听phoneNumber属性变化
    phoneNumber(newValue) {
      this.$bus.$emit('returnPhoneNumber', newValue);
    }
  },
  methods: {
    // 检查手机号是否存在
    checkNumber() {
      let _this = this;
      this.$http({
        url: '/user/verify/check',
        method: 'post',
        params: {
          phoneNumber: this.phoneNumber
        }
      }).then(function (data) {
        console.log(data);
        if (data.data.content !== _this.phoneNumber) {
          _this.$bus.$emit('updateState', false);
          _this.inp = '';
          prompts.methods.warningPrompt("该账号不存在或者失效");
        } else {
          _this.$bus.$emit('updateState', true);
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
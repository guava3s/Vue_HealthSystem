<template>
  <el-input type="text" placeholder="请输入11位手机号" v-model="phoneNumber" autocomplete="off" @change="checkNumber">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
import {prompts} from "@/util/mixin_prompt";
import {elevenNumber} from "@/util/StringUtil";

export default {
  name: "MyPhoneInput",
  data() {
    return {
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
    // 检查手机号是否可用以及存在
    checkNumber() {
      if (!elevenNumber(this.phoneNumber)) {
        return prompts.methods.errorPrompt("请输入正确账号");
      }
      let _this = this;
      this.$http({
        url: '/user/verify/check',
        method: 'post',
        params: {
          phoneNumber: this.phoneNumber
        }
      }).then(function (data) {
        let num = data.data + '';
        if (num !== _this.phoneNumber) {
          prompts.methods.warningPrompt("该账号不存在或者失效");
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
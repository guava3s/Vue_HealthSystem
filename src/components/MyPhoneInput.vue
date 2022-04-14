<template>
  <!--这里可能会有问题-->
  <el-input type="text" placeholder="请输入11位手机号" v-model="phoneNumber" autocomplete="off" @change="checkNumber">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
import {prompts} from "@/util/mixin_prompt";
import {elevenNumber} from "@/util/StringUtil";
import {mapMutations, mapState} from "vuex";

export default {
  name: "MyPhoneInput",
  props: ['requiredSwitch'],
  data() {
    return {
      phoneNumber:''
    }
  },
  computed: {
    ...mapState('user', ['Phone']),
  },
  methods: {
    ...mapMutations('user',['updatePhone']),
    // 检查手机号是否可用以及存在
    checkNumber() {
      if (!elevenNumber(this.Phone)) {
        return prompts.methods.errorPrompt("请输入正确账号");
      }
      let _this = this;
      // 检查是被谁调用
      if (this.requiredSwitch) {
        _this.$http({
          url: '/user/verify/check',
          method: 'post',
          params: {
            phoneNumber: this.Phone
          }
        }).then(function (data) {
          console.log("返回的数据为:", data);
          if (data.data.state) {
            prompts.methods.successPrompt("该账号可以使用");
          } else {
            prompts.methods.warningPrompt("该账号已存在");
          }
        });
      }
    }
  },
  watch: {
    // 监听phoneNumber属性变化
    phoneNumber(newValue) {
      this.updatePhone(newValue);
    }
  }
}
</script>

<style scoped>

</style>
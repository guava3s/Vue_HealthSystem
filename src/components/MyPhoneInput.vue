<template>
  <el-input type="text" placeholder="请输入11位手机号" v-model="phoneNumber" autocomplete="off" @change="checkNumber">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {elevenNumber} from "@/util/StringUtil";
import {prompts} from "@/util/mixin_prompt";

export default {
  name: "MyPhoneInput",
  props: ['requiredSwitch', 'phoneNum'],
  data() {
    return {
      phoneNumber: this.phoneNum
    }
  },
  computed: {
    ...mapState('user', ['Phone']),
  },
  methods: {
    ...mapActions('user', ['updatePhoneByAxios']),
    ...mapMutations('user',['setPhone']),
    // 检查手机号是否可用以及存在
    checkNumber() {
      // 检查是否符合账号规则
      if (elevenNumber(this.phoneNumber)) {
        this.setPhone(this.phoneNumber);
      } else {
        this.phoneNumber = '';
        return prompts.methods.errorPrompt("请输入正确账号");
      }
      // 检查是被谁调用
      if (this.requiredSwitch) {
        this.updatePhoneByAxios(this.phoneNumber);
      }
    }
  },
  watch: {
    // 监听phoneNumber属性变化
    phoneNumber(newValue) {
      this.$bus.$emit('setMarkPhone', newValue);
    }
  }
}
</script>

<style scoped>
</style>
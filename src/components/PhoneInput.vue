<template>
  <el-input type="text" placeholder="请输入手机号" v-model="phoneNumber" autocomplete="off">
    <template slot="prepend">+86</template>
  </el-input>
</template>

<script>
export default {
  name: "PhoneInput",
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
  }
}
</script>

<style scoped>

</style>
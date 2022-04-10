<template>
    <el-input type="password"
              v-model="password"
              autocomplete="off"
              placeholder="请输入密码"
              :prefix-icon="state">
    </el-input>
</template>

<script>
export default {
  name: "MyPassword",
  data() {
    return {
      password: ''
    }
  },
  props: ['state'],
  watch: {
    // 监视password属性，将其发送给PageLogin组件
    password(newValue) {
      this.$bus.$emit('returnPassWord', newValue);
    }
  }
}
</script>

<style scoped>

</style>
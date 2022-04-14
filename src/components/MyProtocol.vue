<template>
  <el-checkbox v-model="check" id="check">
    我已阅读并同意
    <el-button :underline="false" type="text">《健康服务协议》</el-button>
  </el-checkbox>
</template>

<script>
export default {
  name: "MyProtocol",
  data() {
    return {
      check: ''
    }
  },
  watch: {
    check(newValue) {
      this.$bus.$emit('setCheckState', newValue);
    }
  }
}
</script>

<style scoped>
/*复选框字体颜色*/
#check {
  color: darkgrey;
}
</style>
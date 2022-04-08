<template>
  <el-form-item prop="pass" label-width="15px">
    <el-input type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock">
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  name: "MyPassword"
}
</script>

<style scoped>

</style>
<template>
  <el-input type="password"
            v-model="password"
            autocomplete="off"
            :placeholder="placeholderContent"
            :prefix-icon="state">
  </el-input>
</template>

<script>
export default {
  name: "MyPassword",
  data() {
    return {
      markModel: this.model,
      password: ''
    }
  },
  props: ['state', 'model'],
  computed: {
    placeholderContent() {
      return this.markModel == '' ? '请设置密码(至少6位)' : '请输入密码';
    }
  },
  watch: {
    // 监视password属性，将其发送给PageLogin组件
    password(newValue) {
      this.$bus.$emit('setVerifyCode', newValue);
    }
  },
  methods: {
    setPassword(value) {
      this.password = value;
    }
  },
  mounted() {
    this.$bus.$on('setPassword', this.setPassword);
  },
  beforeDestroy() {
    this.$bus.$off('setPassword');
  }
}
</script>

<style scoped>

</style>
<template>
  <el-input type="password"
            v-model="password"
            autocomplete="off"
            :placeholder="placeholderContent"
            prefix-icon="el-icon-lock">
  </el-input>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "MyPassword",
  data() {
    return {
      markModel: this.model,
      password: '',
    }
  },
  props: ['model'],
  computed: {
    placeholderContent() {
      return this.markModel === '' ? '请设置密码(至少6位)' : '请输入密码';
    }
  },
  watch: {
    // 监视password属性，将其发送给PageLogin组件
    password(newValue) {
      this.setVerifyCode(newValue);
      this.$bus.$emit('setVerifyState', newValue);
    }
  },
  methods: {
    ...mapMutations('user', ['setVerifyCode', 'setSerializedAuthCode'])
  }
}
</script>
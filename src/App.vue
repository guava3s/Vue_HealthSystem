<template>
  <div>
    <PageLogin></PageLogin>
    <router-view></router-view>
  </div>
</template>

<script>


import PageLogin from "@/pages/PageLogin";

export default {
  name: 'App',
  components: {PageLogin}
}
</script>

<style>
.item-text .el-form-item__label {
  color: #1fb5ac;
  margin-bottom: 0px;
}

</style>

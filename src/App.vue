<template>

  <div>
    <!--    <MyLogin/>-->
    <!--    <MyRegistration/>-->
    <PageLogin></PageLogin>
  </div>
</template>

<script>

import PageLogin from "@/components/pages/PageLogin";

export default {
  name: 'App',
  components: {
    PageLogin
  }
}
</script>

<style>
body {
  background-image: url("../static/background3.jpg");
}
</style>

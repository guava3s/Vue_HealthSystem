<template>
  <div>
    <!--顶部-->
    <MyHeader/>
    <!--侧边栏-->
    <MySideBar/>
    <!--    <el-container>-->
    <div>
      <router-view></router-view>
    </div>
    <!--    </el-container>-->
  </div>
</template>

<script>
import MyHeader from "@/components/main/MyHeader";
import MySideBar from "@/components/main/MySideBar";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";

export default {
  name: "PageContainer",
  components: {MySideBar, MyHeader},
  mixins: [mixin_routerChange],
  mounted() {
    this.replacePage('r-originContent');
  }
}
</script>

<style scoped>
</style>
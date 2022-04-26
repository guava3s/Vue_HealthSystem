<template>
  <div class="page-container">
    <!--顶部-->
    <MyHeader class="my-header"/>
    <!--侧边栏-->
    <MySideBar class="my-sidebar"/>
    <div class="page-content">
      <router-view></router-view>
    </div>
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
    this.replacePage('r-historyRecordContent');
  }
}
</script>

<style scoped>
.page-container {
  background-color: white;
  /*display: flex;*/
}

.my-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: white;
}

/*侧边导航栏*/
.my-sidebar {
  position: fixed;
  width: 220px;
  top: 60px;
  bottom: 0;
  left: 0;
  background-color: #f5f5f5;
}

.page-content {
  background-color: white;
  margin-top: 60px; /* 与顶部的距离 */
  margin-left: 250px; /* 与左边的距离*/
  margin-right: 50px; /* 与右边的距离*/
  /* 表示该盒子自动占满剩余空间（往下展开） */
  /*flex: 1;*/
}
</style>
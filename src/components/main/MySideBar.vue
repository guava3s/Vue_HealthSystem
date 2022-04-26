<template>
  <el-col :span="12">
    <el-menu default-active="2" @open="handleOpen"
             active-text-color="#e0b12e" text-color="black"
             @close="handleClose">
      <el-menu-item index="1" class="el-menu-item" @click="replacePage('r-historyRecordContent')">
        <i class="el-icon-time"></i>
        <span slot="title">最近</span>
      </el-menu-item>
      <el-menu-item index="2" class="el-menu-item" @click="replacePage('r-bookRepository')">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">图书仓库</span>
      </el-menu-item>
      <el-menu-item index="3" class="el-menu-item" @click="replacePage('r-bookManagement')">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">图书管理</span>
      </el-menu-item>
      <el-menu-item index="4" class="el-menu-item" @click="replacePage('r-bookManagement')">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="5" class="el-menu-item">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
import {mapState} from "vuex";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";

export default {
  name: "MySideBar",
  mixins: [mixin_routerChange],
  data() {
    return {
      username: this.UserName
    }
  },
  computed: {
    ...mapState('user', ['UserName'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
.el-menu-item {
  background-color: #f5f5f5;
}

.el-menu-item:hover {
  background-color: #e2e7ee;
  /*设置圆角边框*/
  border-radius: 10px;
}
</style>
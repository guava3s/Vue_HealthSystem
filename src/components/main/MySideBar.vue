<template>
  <el-col :span="12">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
             active-text-color="#e0b12e" text-color="#EDF0F6FF"
             @close="handleClose">
      <el-menu-item index="1">
        <span slot="title">你好{{ username }}</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "MySideBar",
  data() {
    return {
      username: this.UserName
    }
  },
  computed: {
    ...mapState('user',['UserName'])
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
.el-menu-vertical-demo {
  width: 200px;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  background-color: #25394d;
}
</style>
<template>
  <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
           @select="handleSelect"
           text-color="#EDF0F6FF" active-text-color="#e0b12e">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">消息中心</el-menu-item>
    <el-menu-item index="4">
      <a href="https://www.ele.me" target="_blank">订单管理</a>
    </el-menu-item>

    <el-menu-item index="5"></el-menu-item>
    <el-menu-item index="6"></el-menu-item>
    <el-menu-item index="7"></el-menu-item>
    <el-menu-item index="8"></el-menu-item>
    <el-menu-item index="9"></el-menu-item>

    <!--用户设置-->
    <el-submenu index="10">
      <!--设置头像-->
      <template slot="title">
        <el-avatar :size="29" :src="circleUrl"></el-avatar>
      </template>
      <el-menu-item index="2-1">个人空间</el-menu-item>
      <el-menu-item index="2-2">账户设置</el-menu-item>
      <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {mixin_routerChange} from "@/mixin/mixin_routerChange";
import {prompts} from "@/mixin/mixin_prompt";

export default {
  name: "MyHeader",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  mixins: [mixin_routerChange],
  computed: {
    ...mapState('user', ['Phone'])
  },
  methods: {
    ...mapMutations('user', ['flushAllProperty']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 退出登录
    logout() {
      let _this = this;
      this.$http({
        url: '/user/logout',
        params: {
          phoneNumber: this.Phone
        }
      }).then(function (data) {
        console.log("后端返回的数据为: ", data);
        if (data.data.state) {
          // 返回登录页面
          _this.flushAllProperty('');
          prompts.methods.successPrompt("退出成功");
          _this.replacePage('r-login');
        }
      });
    }
  }
}
</script>
<style scoped>
.el-menu-demo {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #122442; /*藏青色*/
}
.el-menu-item:hover {
  background-color: cornflowerblue;
}
</style>
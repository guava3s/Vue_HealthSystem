<template>
  <!--  <div>-->
  <!--    <div class="row">-->
  <!--      <div class="col-xs-offset-2 col-xs-8">-->
  <!--        <div class="page-header"><h2>Vue Router Demo</h2></div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="row">-->
  <!--      <div class="col-xs-2 col-xs-offset-2">-->
  <!--        <div class="list-group">-->
  <!--          &lt;!&ndash; 原始html中我们使用a标签实现页面的跳转 &ndash;&gt;-->
  <!--          &lt;!&ndash; <a class="list-group-item active" href="./about.html">About</a> &ndash;&gt;-->
  <!--          &lt;!&ndash; <a class="list-group-item" href="./home.html">Home</a> &ndash;&gt;-->

  <!--          &lt;!&ndash; Vue中借助router-link标签实现路由的切换 &ndash;&gt;-->
  <!--          <router-link class="list-group-item" active-class="active" to="/about">About</router-link>-->
  <!--          <br>-->
  <!--          <router-link class="list-group-item" active-class="active" to="/home">Home</router-link>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="col-xs-6">-->
  <!--        <div class="panel">-->
  <!--          <div class="panel-body">-->
  <!--            &lt;!&ndash; 指定组件的呈现位置 &ndash;&gt;-->
  <!--            <router-view></router-view>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div>
    <MyLogin/>
  </div>
</template>

<script>
import MyLogin from "@/components/MyLogin";

export default {
  name: 'App',
  components: {MyLogin}
}
</script>

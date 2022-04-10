import Vue from 'vue' // 引入Vue
import App from './App.vue'  // 引入App
import VueRouter from 'vue-router' // 引入VueRouter
import router from './router' // 引入路由器
import axios from "axios" // 引入axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 修改内部的$http为axios
Vue.prototype.$http = axios.create({
    // URL三个字母必须大写，不然axios不认
    baseURL: 'http://localhost:8000',
    // 设置请求超时时间
    // timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
    el: '#app',
    render: h => h(App),
    router: router,
    beforeCreate() {
        // 安装全局事件总线
        Vue.prototype.$bus = this;
    }
});
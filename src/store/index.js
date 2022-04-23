// 改文件用于创建vuex的核心store
import Vue from "vue";
import Vuex from "vuex";
import store_user from "@/store/store_user";
import store_main from "@/store/store_main"; // 添加user模块

// 使用Vuex
Vue.use(Vuex);

// 创建并导出store
export default new Vuex.Store({
    modules: {
        // 添加user模块
        user: store_user,
        main: store_main
    }
});

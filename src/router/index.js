// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import TestLogin from "@/components/pages/PageLogin";
import MyRegistration from "@/components/MyRegistration";


//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: '/testLogin',
            component: TestLogin
        },
        {
            path: '/myRegistration',
            component: MyRegistration
        }
    ]
});

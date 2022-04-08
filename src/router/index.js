// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import PageLogin from "@/pages/PageLogin";
import PageRegistration from "@/pages/PageRegistration";
import MyPassword from "@/components/MyPassword";
import MyVerify from "@/components/MyVerify";


//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            // 登录
            name: 'r-login',
            path: '/pageLogin',
            component: PageLogin,
            children: [
                {
                    // 切换密码登录
                    name: 'r-password',
                    path: 'myPassword',
                    component: MyPassword
                },
                {
                    // 切换短信验证登录
                    name:'r-verify',
                    path:'myVerify',
                    component:MyVerify
                }
            ]
        },
        {
            name: 'r-register',
            path: '/pageRegistration',
            component: PageRegistration
        }
    ]
});

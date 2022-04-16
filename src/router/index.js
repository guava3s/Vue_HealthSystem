// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import PageLogin from "@/pages/user/PageLogin";
import PageRegistration from "@/pages/user/PageRegistration";
import PageContainer from "@/pages/user/PageContainer";
import MyPassword from "@/components/MyPassword";
import MyVerify from "@/components/MyVerify";
import PagePerfectAccount from "@/pages/user/PagePerfectAccount";
import PageResetPassword from "@/pages/user/PageResetPassword";


//创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            // 初始页面
            path: '/',
            redirect: '/pageLogin'
        },
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
                    name: 'r-verify',
                    path: 'myVerify',
                    component: MyVerify
                }
            ]
        },
        {
            // 注册页面
            name: 'r-register',
            path: '/pageRegistration',
            component: PageRegistration
        },
        {
            // 完善账号页面
            name: 'r-perfect',
            path: '/pagePerfectAccount',
            component: PagePerfectAccount
        },
        {
            // 找回密码页面
            name: 'r-resetVerify',
            path: '/pageResetPassword',
            component: PageResetPassword,
            children: [
                {
                    // 使用密码框
                    name: 'r-use-pass',
                    path: 'resetPassword',
                    component: MyPassword,
                    meta: {
                        url: '/user/verify/codeAuth'
                    },
                },
                {
                    // 切换短信验证登录
                    name: 'r-use-verify',
                    path: 'putVerify',
                    component: MyVerify
                }
            ]
        },
        // 网站首页
        {
            name: 'r-container',
            path: '/pageContainer',
            component: PageContainer
        }
    ]
});

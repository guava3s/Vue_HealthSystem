// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import PageLogin from "@/pages/user/PageLogin";
import PageRegistration from "@/pages/user/PageRegistration";
import PageContainer from "@/pages/main/PageContainer";
import MyPassword from "@/components/MyPassword";
import MyVerify from "@/components/MyVerify";
import PagePerfectAccount from "@/pages/user/PagePerfectAccount";
import PageResetPassword from "@/pages/user/PageResetPassword";


//创建并暴露一个路由器
const MyRouter = new VueRouter({
    routes: [
        // 初始页面
        {
            path: '/',
            redirect: '/pageLogin'
        },
        // 登录
        {
            name: 'r-login',
            path: '/pageLogin',
            component: PageLogin,
            meta: {
                title: '登录'
            },
            children: [
                // 切换密码登录
                {
                    name: 'r-password',
                    path: 'myPassword',
                    component: MyPassword,
                    meta: {
                        title: '密码登录'
                    }
                },
                // 切换短信验证登录
                {
                    name: 'r-verify',
                    path: 'myVerify',
                    component: MyVerify,
                    meta: {
                        title: '短信登录'
                    }
                }
            ]
        },
        // 注册页面
        {
            name: 'r-register',
            path: '/pageRegistration',
            component: PageRegistration,
            meta: {title: '注册页面'}
        },
        // 完善账号页面
        {
            name: 'r-perfect',
            path: '/pagePerfectAccount',
            component: PagePerfectAccount,
            meta: {
                title: '完善用户信息',
                isAuth: true
            },
            beforeEnter: (to, from, next) => {
                if (from.name === 'r-register') {
                    next();
                } else {
                    return alert('拒绝访问');
                }
            }
        },
        // 找回密码页面
        {
            name: 'r-resetVerify',
            path: '/pageResetPassword',
            component: PageResetPassword,
            meta: {
                title: '找回密码'
            },
            children: [
                // 使用密码框
                {
                    name: 'r-use-pass',
                    path: 'resetPassword',
                    component: MyPassword,
                    beforeEnter: (to, from, next) => {
                        if (from.name === 'r-use-verify') {
                            next();
                        } else {
                            return alert("拒绝访问");
                        }
                    }
                },
                // 切换短信验证登录
                {
                    name: 'r-use-verify',
                    path: 'putVerify',
                    component: MyVerify,
                    meta: {
                        title: '短信验证'
                    }
                }
            ]
        },
        // 网站首页
        {
            name: 'r-container',
            path: '/pageContainer',
            component: PageContainer,
            meta: {
                title: '健康系统首页'
            }
        }
    ]
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
MyRouter.afterEach((to) => {
    document.title = to.meta.title || '健康系统'
})

export default MyRouter;
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "home" */ '@/views/dashboard/index.vue'),
            meta: { title: 'home文件' }
        },
        {
            path: '/drug',
            component: () => import(/* webpackChunkName: "home" */ '@/views/drug/index.vue'),
            meta: { title: '药品管理' }
        },
        // {
        //     path: '/',
        //     component: () => import(/* webpackChunkName: "home" */ '@/views/layout/Home.vue'),
        //     meta: { title: 'home文件' },
        //     children: [
        //         {
        //             path: '/dashboard',
        //             component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
        //             meta: { title: '系统首页' }
        //         },
        //         {
        //             path: '/drug',
        //             component: () => import(/* webpackChunkName: "dashboard" */ '@/views/drug/index.vue'),
        //             meta: { title: '药品' }
        //         },
        //         {
        //             //     // 富文本编辑器组件
        //             path: '/editor',
        //             component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
        //             meta: { title: '富文本编辑器' }
        //         },
        //         {
        //             // 权限页面
        //             path: '/permission',
        //             component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
        //             meta: { title: '权限测试', permission: true }
        //         },
        //         {
        //             path: '/404',
        //             component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
        //             meta: { title: '404' }
        //         },
        //         {
        //             path: '/403',
        //             component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
        //             meta: { title: '403' }
        //         }
        //     ]
        // },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/common/Login.vue'),
            meta: { title: '登录' }
        },

        {
            path: '*',
            redirect: '/404'
        }
    ]
});

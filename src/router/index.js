import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "home" */ '@/views/dashboard/index.vue'),
            meta: { title: '系统首页' }
        },
        // drug
        {
            path: '/drug/list',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/list.vue'),
            meta: { title: '药品列表' }
        },
        {
            path: '/drug/add',

            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/add.vue'),
            meta: { title: '新增药品' }
        },
        {
            path: '/drug/update',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/update.vue'),
            meta: { title: '修改药品' }
        },
        {
            path: '/drug/detail',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/detail.vue'),
            meta: { title: '药品详情' }
        },
        {
            path: '/drug/check',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/check.vue'),
            meta: { title: '药品审核' }
        },
        {
            path: '/drug/my',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/my.vue'),
            meta: { title: '我的审核' }
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "404" */ '@/views/common/404.vue'),
            meta: { title: '404', permission: true }
        },
        {
            path: '/error',
            component: () => import(/* webpackChunkName: "403" */ '@/views/common/error.vue'),
            meta: { title: '403', permission: true }
        },
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

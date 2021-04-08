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
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '@/views/common/Login.vue'),
            meta: { title: '登录' }
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
            path: '/drug/check-detail',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/check-detail.vue'),
            meta: { title: '药品审核详情' }
        },
        {
            path: '/drug/my',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/my.vue'),
            meta: { title: '我的提交' }
        },
        {
            path: '/drug/my',
            component: () => import(/* webpackChunkName: "drug" */ '@/views/drug/my.vue'),
            meta: { title: '我的提交' }
        },
        // article
        {
            path: '/article/list',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/list.vue'),
            meta: { title: '文章列表' }
        },
        {
            path: '/article/add',

            component: () => import(/* webpackChunkName: "article" */ '@/views/article/add.vue'),
            meta: { title: '新增文章' }
        },
        {
            path: '/article/update',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/update.vue'),
            meta: { title: '修改文章' }
        },
        {
            path: '/article/detail',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/detail.vue'),
            meta: { title: '文章详情' }
        },
        {
            path: '/article/check',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/check.vue'),
            meta: { title: '文章审核' }
        },
        {
            path: '/article/check-detail',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/check-detail.vue'),
            meta: { title: '文章审核详情' }
        },
        {
            path: '/article/my',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/my.vue'),
            meta: { title: '我的提交' }
        },
        {
            path: '/article/my',
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/my.vue'),
            meta: { title: '我的提交' }
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
            path: '*',
            redirect: '/404'
        }
    ]
});

import Vue from 'vue';
import Router from 'vue-router';

import disease from './disease';
import drug from './drug';
import article from './article';
import interaction from './interaction';

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
        ...drug,
        ...disease,
        ...article,
        ...interaction,
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

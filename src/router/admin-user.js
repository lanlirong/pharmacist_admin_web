const adminUser = [
    // admin-user
    {
        path: '/admin-user/list',
        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/list.vue'),
        meta: { title: '用户列表' }
    },
    {
        path: '/admin-user/limit',

        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/limit.vue'),
        meta: { title: '用户权限' }
    }
];
export default adminUser;

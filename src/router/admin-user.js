const adminUser = [
    // admin-user
    {
        path: '/admin-user/list',
        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/list.vue'),
        meta: { title: '用户列表' }
    },
    {
        path: '/admin-user/add',

        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/add.vue'),
        meta: { title: '新增用户' }
    }
];
export default adminUser;

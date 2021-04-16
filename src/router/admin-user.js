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
    },
    {
        path: '/admin-user/detail',

        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/detail.vue'),
        meta: { title: '用户详情' }
    },
    {
        path: '/admin-user/update',

        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/update.vue'),
        meta: { title: '用户修改' }
    },
    {
        path: '/admin-user/limit',

        component: () => import(/* webpackChunkName: "admin-user" */ '@/views/admin-user/limit.vue'),
        meta: { title: '用户权限' }
    }
];
export default adminUser;

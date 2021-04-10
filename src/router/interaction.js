const consult = [
    // consult
    {
        path: '/consult/list',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/list.vue'),
        meta: { title: '疾病列表' }
    },
    {
        path: '/consult/add',

        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/add.vue'),
        meta: { title: '新增疾病' }
    },
    {
        path: '/consult/update',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/update.vue'),
        meta: { title: '修改疾病' }
    },
    {
        path: '/consult/detail',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/detail.vue'),
        meta: { title: '疾病详情' }
    },
    {
        path: '/consult/check',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/check.vue'),
        meta: { title: '疾病审核' }
    },
    {
        path: '/consult/check-detail',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/check-detail.vue'),
        meta: { title: '疾病审核详情' }
    },
    {
        path: '/consult/my',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/my.vue'),
        meta: { title: '我的提交' }
    },
    {
        path: '/consult/my',
        component: () => import(/* webpackChunkName: "consult" */ '@/views/consult/my.vue'),
        meta: { title: '我的提交' }
    }
];

export default consult;

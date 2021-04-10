const drug = [
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
    }
];

export default drug;

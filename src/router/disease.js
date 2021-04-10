const interaction = [
    // interaction
    {
        path: '/interaction/list',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/list.vue'),
        meta: { title: '疾病列表' }
    },
    {
        path: '/interaction/add',

        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/add.vue'),
        meta: { title: '新增疾病' }
    },
    {
        path: '/interaction/update',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/update.vue'),
        meta: { title: '修改疾病' }
    },
    {
        path: '/interaction/detail',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/detail.vue'),
        meta: { title: '疾病详情' }
    },
    {
        path: '/interaction/check',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/check.vue'),
        meta: { title: '疾病审核' }
    },
    {
        path: '/interaction/check-detail',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/check-detail.vue'),
        meta: { title: '疾病审核详情' }
    },
    {
        path: '/interaction/my',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/my.vue'),
        meta: { title: '我的提交' }
    },
    {
        path: '/interaction/my',
        component: () => import(/* webpackChunkName: "interaction" */ '@/views/interaction/my.vue'),
        meta: { title: '我的提交' }
    }
];

export default interaction;

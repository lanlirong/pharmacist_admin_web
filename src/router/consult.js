const disease = [
    // disease
    {
        path: '/disease/list',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/list.vue'),
        meta: { title: '疾病列表' }
    },
    {
        path: '/disease/add',

        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/add.vue'),
        meta: { title: '新增疾病' }
    },
    {
        path: '/disease/update',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/update.vue'),
        meta: { title: '修改疾病' }
    },
    {
        path: '/disease/detail',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/detail.vue'),
        meta: { title: '疾病详情' }
    },
    {
        path: '/disease/check',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/check.vue'),
        meta: { title: '疾病审核' }
    },
    {
        path: '/disease/check-detail',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/check-detail.vue'),
        meta: { title: '疾病审核详情' }
    },
    {
        path: '/disease/my',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/my.vue'),
        meta: { title: '我的提交' }
    },
    {
        path: '/disease/my',
        component: () => import(/* webpackChunkName: "disease" */ '@/views/disease/my.vue'),
        meta: { title: '我的提交' }
    }
];

export default disease;

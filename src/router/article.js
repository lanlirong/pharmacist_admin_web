const article = [
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
    }
];

export default article;

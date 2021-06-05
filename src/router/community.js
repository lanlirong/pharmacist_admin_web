const community = [
    {
        path: '/community/postlist',
        component: () => import(/* webpackChunkName: "community" */ '@/views/community/postList.vue'),
        meta: { title: '帖子列表' }
    },
    {
        path: '/community/commentlist',
        component: () => import(/* webpackChunkName: "community" */ '@/views/community/commentList.vue'),
        meta: { title: '帖子列表' }
    }
];

export default community;

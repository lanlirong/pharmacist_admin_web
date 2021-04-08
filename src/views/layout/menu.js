const menu = [
    {
        icon: 'el-icon-lx-home',
        index: '/dashboard',
        title: '系统首页'
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'drug',
        title: '药品管理',
        subs: [
            {
                index: '/drug/list',
                title: '药品列表'
            },
            {
                index: '/drug/add',
                title: '新增药品'
            },
            {
                index: '/drug/check',
                title: '药品审核'
            },
            {
                index: '/drug/my',
                title: '我的提交'
            }
        ]
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'article',
        title: '文章管理',
        subs: [
            {
                index: '/article/list',
                title: '文章列表'
            },
            {
                index: '/article/add',
                title: '新增文章'
            },
            {
                index: '/article/check',
                title: '文章审核'
            },
            {
                index: '/article/my',
                title: '我的提交'
            }
        ]
    }
];

export default menu;

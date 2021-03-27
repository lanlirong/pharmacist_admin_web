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
            }
            // {
            //     index: '/drug/',
            //     title: '新增药品'
            // }
        ]
    }
];

export default menu;

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
        index: 'interaction',
        title: '相互作用管理',
        subs: [
            {
                index: '/interaction/list',
                title: '相互作用列表'
            },
            {
                index: '/interaction/add',
                title: '新增相互作用'
            },
            {
                index: '/interaction/check',
                title: '相互作用审核'
            },
            {
                index: '/interaction/my',
                title: '我的提交'
            }
        ]
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'disease',
        title: '疾病管理',
        subs: [
            {
                index: '/disease/list',
                title: '疾病列表'
            },
            {
                index: '/disease/add',
                title: '新增疾病'
            },
            {
                index: '/disease/check',
                title: '疾病审核'
            },
            {
                index: '/disease/my',
                title: '我的提交'
            }
        ]
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'consult',
        title: '用药咨询管理',
        subs: [
            {
                index: '/consult/list',
                title: '用药咨询列表'
            },
            {
                index: '/consult/add',
                title: '新增用药咨询'
            },
            {
                index: '/consult/check',
                title: '用药咨询审核'
            },
            {
                index: '/consult/my',
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
    },
    {
        icon: 'el-icon-lx-cascades',
        index: 'system_user',
        title: '系统用户管理',
        subs: [
            {
                index: '/system_user/list',
                title: '系统用户列表'
            },
            {
                index: '/system_user/add',
                title: '新增系统用户'
            },
            {
                index: '/system_user/check',
                title: '用户权限管理'
            }
        ]
    }
];

export default menu;

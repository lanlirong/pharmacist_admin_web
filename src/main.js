import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './utils/directives'; // vue 指令
import 'babel-polyfill';
import './utils/filters'; // 全局过滤器
import store from './store';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 药师助手后台管理系统`;
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
            confirmButtonText: '确定'
        });
    } else {
        next();
    }
});

// 注册全局组件
const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.g\.vue$/
);
requireComponent.keys().forEach(fileName => {
    const comp = requireComponent(fileName).default;
    Vue.component(comp.name, comp);
});

export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

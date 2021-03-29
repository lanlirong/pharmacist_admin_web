import axios from 'axios';
import { Message } from 'element-ui';
import VueThis from '@/main.js';
const instance = axios.create({
    baseURL: 'http://localhost:80/',
    timeout: 20000, // 请求超时时间，3000ms未响应则停止请求
    withCredentials: true, // 允许携带cookie
    headers: { 'Content-Type': 'application/json' }
});
// 请求拦截
instance.interceptors.request.use(config => {
    return config;
});

/* 
1 成功
2 404页面
3 错误页面
4 游客身份，login页面
5 无权限提示
*/
// 响应拦截
instance.interceptors.response.use(
    response => {
        let { status, data } = response;
        if (!status || status !== 200) {
            Message.error('status:' + status);
            return Promise.reject(data);
        } else {
            if (data.code === 1) {
                return data;
            } else if (data.code === 2) {
                // 404
                VueThis.$router.push('/404');
                return;
            } else if (data.code === 3) {
                // error
                VueThis.$router.push('/error');
                return;
            } else if (data.code === 4) {
                // 游客
                VueThis.$router.push('/login');
                Message.error(data.msg);
                return;
            } else if (data.code === 5) {
                // 无权限
                Message.error(data.msg);
                return;
            }
        }
    },
    error => {
        // 错误提醒
        Message.error('status:' + error.response.status + ' 服务器出错');
        return Promise.reject(error);
    }
);

export default instance;

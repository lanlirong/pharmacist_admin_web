import axios from '../http';
export const _login = (params = {}) => {
    return axios.post('/admin/login', { ...params });
};
export const _logout = () => {
    return axios.get('/admin/logout');
};

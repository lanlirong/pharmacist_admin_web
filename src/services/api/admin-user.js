import axios from '../http';
export const _login = (params = {}) => {
    return axios.post('/api/admin/login', { ...params });
};
export const _logout = () => {
    return axios.get('/api/admin/logout');
};

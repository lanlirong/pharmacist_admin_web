import axios from '../http';
export const _login = (params = {}) => {
    return axios.post('/admin/login', { ...params });
};
export const _logout = () => {
    return axios.get('/admin/logout');
};

export const _getList = (params = {}) => {
    return axios.post('/admin/adminuser/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/adminuser/one', { params });
};
export const _deleteOne = (params = {}) => {
    return axios.get('/admin/adminuser/deleteOne', { params });
};
export const _add = (params = {}) => {
    return axios.post('/admin/adminuser/add', { ...params });
};

export const _update = (params = {}) => {
    return axios.post('/admin/adminuser/update', { ...params });
};

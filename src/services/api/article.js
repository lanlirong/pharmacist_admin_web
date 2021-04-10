import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/article/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/article/one', { params });
};
export const _deleteOne = (params = {}) => {
    return axios.get('/admin/article/deleteOne', { params });
};
export const _update = (params = {}) => {
    return axios.post('/admin/article/update', { ...params });
};
export const _getCount = () => {
    return axios.get('/admin/article/count');
};
/* raw */

export const _addRaw = (params = {}) => {
    return axios.post('/admin/article/addRaw', { ...params });
};
export const _updateRaw = (params = {}) => {
    return axios.post('/admin/article/updateRaw', { ...params });
};
export const _getRawList = (params = {}) => {
    return axios.post('/admin/article/rawList', { ...params });
};
export const _getRawDetail = (params = {}) => {
    return axios.get('/admin/article/rawOne', { params });
};
export const _getMyRawList = (params = {}) => {
    return axios.post('/admin/article/myRawList', { ...params });
};
export const _check = (params = {}) => {
    return axios.get('/admin/article/check', { params });
};

export const _deleteRaw = (params = {}) => {
    return axios.get('/admin/article/deleteRaw', { params });
};

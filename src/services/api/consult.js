import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/consult/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/consult/one', { params });
};
export const _deleteOne = (params = {}) => {
    return axios.get('/admin/consult/deleteOne', { params });
};
export const _update = (params = {}) => {
    return axios.post('/admin/consult/update', { ...params });
};
export const _getCount = () => {
    return axios.get('/admin/consult/count');
};
/* raw */

export const _addRaw = (params = {}) => {
    return axios.post('/admin/consult/addRaw', { ...params });
};
export const _updateRaw = (params = {}) => {
    return axios.post('/admin/consult/updateRaw', { ...params });
};
export const _getRawList = (params = {}) => {
    return axios.post('/admin/consult/rawList', { ...params });
};
export const _getRawDetail = (params = {}) => {
    return axios.get('/admin/consult/rawOne', { params });
};
export const _getMyRawList = (params = {}) => {
    return axios.post('/admin/consult/myRawList', { ...params });
};
export const _check = (params = {}) => {
    return axios.get('/admin/consult/check', { params });
};

export const _deleteRaw = (params = {}) => {
    return axios.get('/admin/consult/deleteRaw', { params });
};

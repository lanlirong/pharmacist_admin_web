import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/interaction/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/interaction/one', { params });
};
export const _deleteOne = (params = {}) => {
    return axios.get('/admin/interaction/deleteOne', { params });
};
export const _update = (params = {}) => {
    return axios.post('/admin/interaction/update', { ...params });
};
export const _getCount = () => {
    return axios.get('/admin/interaction/count');
};
/* raw */

export const _addRaw = (params = {}) => {
    return axios.post('/admin/interaction/addRaw', { ...params });
};
export const _updateRaw = (params = {}) => {
    return axios.post('/admin/interaction/updateRaw', { ...params });
};
export const _getRawList = (params = {}) => {
    return axios.post('/admin/interaction/rawList', { ...params });
};
export const _getRawDetail = (params = {}) => {
    return axios.get('/admin/interaction/rawOne', { params });
};
export const _getMyRawList = (params = {}) => {
    return axios.post('/admin/interaction/myRawList', { ...params });
};
export const _check = (params = {}) => {
    return axios.get('/admin/interaction/check', { params });
};

export const _deleteRaw = (params = {}) => {
    return axios.get('/admin/interaction/deleteRaw', { params });
};

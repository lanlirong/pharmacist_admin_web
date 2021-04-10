import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/disease/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/disease/one', { params });
};
export const _deleteOne = (params = {}) => {
    return axios.get('/admin/disease/deleteOne', { params });
};
export const _update = (params = {}) => {
    return axios.post('/admin/disease/update', { ...params });
};
export const _getDiseaseCount = () => {
    return axios.get('/admin/disease/count');
};
/* raw */

export const _addRaw = (params = {}) => {
    return axios.post('/admin/disease/addRaw', { ...params });
};
export const _updateRaw = (params = {}) => {
    return axios.post('/admin/disease/updateRaw', { ...params });
};
export const _getRawList = (params = {}) => {
    return axios.post('/admin/disease/rawList', { ...params });
};
export const _getRawDetail = (params = {}) => {
    return axios.get('/admin/disease/rawOne', { params });
};
export const _getMyRawList = (params = {}) => {
    return axios.post('/admin/disease/myRawList', { ...params });
};
export const _check = (params = {}) => {
    return axios.get('/admin/disease/check', { params });
};

export const _deleteRaw = (params = {}) => {
    return axios.get('/admin/disease/deleteRaw', { params });
};

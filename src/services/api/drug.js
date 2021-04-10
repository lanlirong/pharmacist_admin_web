import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/drug/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/drug/one', { params });
};
export const _getCount = () => {
    return axios.get('/admin/drug/count');
};
export const _addRawDrug = (params = {}) => {
    return axios.post('/admin/drug/addRaw', { ...params });
};

export const _getRawList = (params = {}) => {
    return axios.post('/admin/drug/rawList', { ...params });
};
export const _getRawDetail = (params = {}) => {
    return axios.get('/admin/drug/rawOne', { params });
};
export const _getMyRawList = (params = {}) => {
    return axios.post('/admin/drug/myRawList', { ...params });
};
export const _check = (params = {}) => {
    return axios.get('/admin/drug/check', { params });
};

export const _deleteRawDrug = (params = {}) => {
    return axios.get('/admin/drug/deleteRawDrug', { params });
};

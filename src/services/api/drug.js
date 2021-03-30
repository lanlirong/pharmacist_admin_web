import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/admin/drug/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/admin/drug/one', { params });
};
export const _getDrugCount = () => {
    return axios.get('/admin/drug/count');
};
export const _addDrug = (params = {}) => {
    return axios.post('/admin/drug/add', { ...params });
};

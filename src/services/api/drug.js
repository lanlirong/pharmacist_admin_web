import axios from '../http';

export const _getList = (params = {}) => {
    return axios.post('/api/admin/drug/list', { ...params });
};
export const _getDetail = (params = {}) => {
    return axios.get('/api/admin/drug/one', { params });
};
export const _getDrugCount = () => {
    return axios.get('/api/drug/count');
};

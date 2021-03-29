import axios from '../http';

export const _getList = (params = {}) => {
    return axios.get('/admin/disease/list', { params });
};
export const _getOne = (params = {}) => {
    return axios.get('/admin/disease/one', { params });
};
export const _getDiseaseCount = () => {
    return axios.get('/admin/disease/count');
};

import axios from '../http';

export const _getList = (params = {}) => {
    return axios.get('/admin/interaction/list', { params });
};
export const _getOne = (params = {}) => {
    return axios.get('/admin/interaction/one', { params });
};
export const _getInteractionCount = () => {
    return axios.get('/admin/interaction/count');
};

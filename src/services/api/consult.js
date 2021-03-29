import axios from '../http';
export const _getList = (params = {}) => {
    return axios.post('/admin/consult/list', { ...params });
};
export const _getOne = (params = {}) => {
    return axios.get('/admin/consult/one', { params });
};
export const _getConsultCount = () => {
    return axios.get('/admin/consult/count');
};

export const _getBooks = () => {
    return axios.get('/admin/consult/books');
};

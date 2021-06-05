import axios from '../http';

export const _getPostList = (params = {}) => {
    return axios.post('/admin/community/postlist', { ...params });
};
export const _getPostDetail = (params = {}) => {
    return axios.get('/admin/community/postone', { params });
};
export const _deletePostOne = (params = {}) => {
    return axios.get('/admin/community/postdeleteOne', { params });
};

export const _getCommentList = (params = {}) => {
    return axios.post('/admin/community/commentlist', { ...params });
};
export const _getCommentDetail = (params = {}) => {
    return axios.get('/admin/community/commentone', { params });
};
export const _deleteCommentOne = (params = {}) => {
    return axios.get('/admin/community/commentdeleteOne', { params });
};

import api from './request';

// getXXX 自定义的接口名字
export const userLogin = (params: {} | undefined) => api(`/auth/login`, params, 'post');
import api from './request';

/**用户登录 */
export const userLogin = (params: {} | undefined) => api(`/auth/login`, params, 'post');
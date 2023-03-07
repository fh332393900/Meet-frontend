import api from './request';

import { CreateMeet, GetMeet } from './type';

/**用户登录 */
export const userLogin = (params: {} | undefined) => api(`/auth/login`, params, 'post');

/**创建会议 */
export const createMeet = (params: CreateMeet) => api(`/meet/create`, params, 'post');

/**查询会议详情 */
export const getMeet = (params: GetMeet) => api('/meet/get', params, 'get');
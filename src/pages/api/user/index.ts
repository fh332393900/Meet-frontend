
import api from '../request';
import type { Register } from './type';

/**用户注册 */
export const register = (params: Register) => api('/user/register', params, 'post');
import { MeetNeedPassword } from '@/types/meet';
export interface CreateMeet {
  /**会议名称 */
  meetName: string;
  /**是否需要密码 1不需要，2需要 */
  meetNeedPassword: MeetNeedPassword,
  /**会议密码 */
  meetPassword: string;
}

export interface GetMeet {
  id: string
}
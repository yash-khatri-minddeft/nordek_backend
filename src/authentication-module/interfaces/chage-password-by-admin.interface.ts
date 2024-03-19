import { UserIdPayload } from '../types';

export const DIChangePasswordByAdmin = Symbol.for('DIChangePasswordByAdmin');

export interface IChangePasswordByAdmin<
  Payload extends UserIdPayload = UserIdPayload,
> {
  changePassword(params: {
    userId: string;
    adminId: string;
    newPassword: string;
    payload: Payload;
  }): Promise<void>;
}

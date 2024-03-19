import { UserIdPayload } from './payload.type';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  payload: UserIdPayload;
};

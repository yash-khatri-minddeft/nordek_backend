import { Request } from 'express';
import { UserIdPayload, SessionIdPayload } from './payload.type';

export type RequestWithPayload<
  Payload extends UserIdPayload = UserIdPayload & SessionIdPayload,
> = Request & {
  payload: Payload;
};

import { UserIdPayload } from './payload.type';

export type RefreshTokenPayload<Payload extends UserIdPayload = UserIdPayload> =
  { sessionId: string; payload: Payload };

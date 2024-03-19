export type SessionIdPayload = { sessionId: string };
export type UserIdPayload = { userId: string };
export type PasswordPayload = { password: string };
export type MinimalLoginPayload = UserIdPayload & PasswordPayload;

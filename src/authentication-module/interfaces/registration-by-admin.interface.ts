import { UserIdPayload } from '../types';

export const DIRegistrationByAdmin = Symbol.for('DIRegistrationByAdmin');

export interface IRegistrationByAdmin<
  Payload extends UserIdPayload = UserIdPayload,
  RegistryResponse = void,
  Fields = undefined,
> {
  registrationByAdmin(params: {
    email: string;
    password: string;
    adminId: string;
    fields?: Fields;
    payload: Payload;
  }): Promise<RegistryResponse>;
}

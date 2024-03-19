import { MinimalLoginPayload } from '../types';

export const DILocalStrategy = Symbol.for('DILocalStrategy');

/**
 * TODO: do to decompose login and registry
 */
export interface ILocalStrategy<
  Payload extends MinimalLoginPayload = MinimalLoginPayload,
  LoginMeta = object,
> {
  login(email: string, meta?: LoginMeta): Promise<Payload>;

  // registry(email: string, password: string, meta?: Meta): Promise<void>;
}

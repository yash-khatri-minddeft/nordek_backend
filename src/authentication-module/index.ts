export { AuthenticationModule } from './authentication.module';
export {
  DILocalStrategy,
  ILocalStrategy,
  DIJWTOption,
  JwtOption,
  DIChangePassword,
  IChangePassword,
  DIChangePasswordByAdmin,
  IChangePasswordByAdmin,
  IRegistrationByAdmin,
  DIRegistrationByAdmin,
} from './interfaces';
export { RequestWithPayload, UserIdPayload } from './types';
export { AccessToken } from './decorators';
export { SessionService } from './services';

import {
  Module,
  DynamicModule,
  ModuleMetadata,
  Provider as BaseProvider,
  Global,
} from '@nestjs/common';

import {
  AuthController,
  ChangePasswordByAdminController,
  ChangePasswordController,
  RegisterByAdminController,
} from './controllers';
import {
  LocalLoginUseCase,
  LogoutUseCase,
  RefreshUseCase,
  ChangePasswordUseCase,
  ChangePasswordByAdminUseCase,
  RegisterByAdminUseCase,
} from './use-case';
import { SessionService, TokenService } from './services';

type Provider = BaseProvider & { imports?: ModuleMetadata['imports'] };

/**
 * TODO: make current sessions logic like strategy
 */
@Global()
@Module({})
export class AuthenticationModule {
  static forRoot({
    providers,
    imports,
  }: {
    providers: Provider[];
    imports: ModuleMetadata['imports'];
  }): DynamicModule {
    return {
      imports,
      module: AuthenticationModule,
      providers: [
        LocalLoginUseCase,
        LogoutUseCase,
        RefreshUseCase,
        SessionService,
        TokenService,
        ChangePasswordUseCase,
        ChangePasswordByAdminUseCase,
        RegisterByAdminUseCase,
        {
          provide: TokenService,
          useClass: TokenService,
        },
        ...providers,
      ],
      controllers: [
        AuthController,
        ChangePasswordByAdminController,
        ChangePasswordController,
        RegisterByAdminController,
      ],
      exports: [TokenService, SessionService],
    };
  }
}

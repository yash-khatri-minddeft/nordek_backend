import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { IJwtConfig } from 'src/configs';
import {
  DILocalStrategy,
  DIChangePassword,
  DIJWTOption,
  DIChangePasswordByAdmin,
  JwtOption,
  DIRegistrationByAdmin,
} from 'src/authentication-module';
import { AuthenticationModule } from 'src/authentication-module';
import {
  LocalStrategy,
  ChangePasswordStrategy,
  ChangePasswordByAdminStrategy,
  RegisterByAdminStrategy,
} from './strategies';
import { UsersModule } from '../users/users.module';
import { ConfigNames } from 'src/common/enums';
import { RolesModule } from '../roles/roles.module';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    AuthenticationModule.forRoot({
      imports: [UsersModule, RolesModule, OtpModule],
      providers: [
        { provide: DILocalStrategy, useClass: LocalStrategy },
        {
          provide: DIJWTOption,
          useFactory: (configService: ConfigService): JwtOption => {
            return configService.getOrThrow<IJwtConfig>(ConfigNames.JWT);
          },
          imports: [ConfigModule],
          inject: [ConfigService],
        },
        {
          provide: DIChangePassword,
          useClass: ChangePasswordStrategy,
        },
        {
          provide: DIChangePasswordByAdmin,
          useClass: ChangePasswordByAdminStrategy,
        },
        {
          provide: DIRegistrationByAdmin,
          useClass: RegisterByAdminStrategy,
        },
      ],
    }),
  ],
})
export class AuthModule {}

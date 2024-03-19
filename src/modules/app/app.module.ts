import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApplicationSeedModule } from '../application-seed/application-seed.module';
import {
  RedisConnection,
  DatabaseConnection,
  appConfig,
  databaseConfig,
  jwtConfig,
  redisConfig,
  etherConfig,
} from 'src/configs';
import { DbModule } from 'src/infrastructure/database';
import { LoggerMiddleware } from 'src/infrastructure/logger';
import { RedisModule } from 'src/infrastructure/redis';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { WalletsModule } from '../wallets/wallets.module';
import { OtpModule } from '../otp/otp.module';
import { TokensModule } from '../tokens/tokens.module';
import { FeeModule } from '../fee/fee.module';
import { PairsModule } from '../pairs/pairs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, redisConfig, jwtConfig, etherConfig],
      isGlobal: true,
    }),
    DbModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConnection,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConnection,
    }),
    ApplicationSeedModule,
    AuthModule,
    RolesModule,
    WalletsModule,
    OtpModule,
    TokensModule,
    FeeModule,
    PairsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

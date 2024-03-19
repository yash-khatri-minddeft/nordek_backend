import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';
import { RedisModuleOptions } from 'src/infrastructure/redis';
import { IRedisConfig } from 'src/configs';

@Injectable()
export class RedisConnection {
  constructor(private readonly configService: ConfigService) {}

  public create(): RedisModuleOptions {
    const config = this.configService.getOrThrow<IRedisConfig>(
      ConfigNames.REDIS,
    );

    return {
      port: config.port,
      host: config.host,
      db: config.db,
      username: config.username,
      password: config.password,
    };
  }
}

import { registerAs } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';

export interface IRedisConfig {
  host: string;
  port: number;
  db: number;
  password: string;
  username: string;
}

const ENV = process.env;

/**
 * TODO: write config validation
 */
export const redisConfig = registerAs(ConfigNames.REDIS, () => {
  const config: IRedisConfig = {
    host: ENV.REDIS_HOST as string,
    port: Number(ENV.REDIS_PORT),
    db: Number(ENV.REDIS_DB),
    password: ENV.REDIS_PASSWORD as string,
    username: ENV.REDIS_USERNAME as string,
  };
  return config;
});

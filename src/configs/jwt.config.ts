import { registerAs } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';
import { InternalServerErrorException } from 'src/common/exceptions';

export interface IJwtConfig {
  secret: string;
  expire: number;
  refreshExpire: number;
}

export const jwtConfig = registerAs(ConfigNames.JWT, () => {
  const secret = process.env.JWT_SECRET;
  const expire = Number(process.env.JWT_EXPIRE);
  const refreshExpire = Number(process.env.JWT_REFRESH_EXPIRE);

  if (!secret || !expire) {
    throw new InternalServerErrorException('JWT config error');
  }

  const config: IJwtConfig = {
    secret,
    expire,
    refreshExpire,
  };
  return config;
});

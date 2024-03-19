import { registerAs } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';

export interface IAppConfig {
  port: number;
  bcryptSalt: number;
  isProduction: boolean;
  isDevelopment: boolean;
  isLocal: boolean;
  defaultDescription: string;
}

export const appConfig = registerAs(ConfigNames.APP, () => {
  const port = process.env.PORT ? +process.env.PORT : 5001;
  const NODE_ENV = process.env.NODE_ENV;

  const config: IAppConfig = {
    port: port,
    bcryptSalt: 4,
    isProduction: NODE_ENV === 'production',
    isDevelopment: NODE_ENV !== 'production',
    isLocal: NODE_ENV === 'local',
    defaultDescription:
      process.env.DEFAULT_DESCRIPTION || 'Tell me something about yourself',
  };
  return config;
});

import { registerAs } from '@nestjs/config';

import { ConfigNames } from 'src/common/enums';

export interface IDatabaseConfig {
  host: string;
  userName: string;
  password: string;
  port: number;
  dbName: string;
  poolSize: number;
}

export const databaseConfig = registerAs(ConfigNames.DATABASE, () => {
  const host = process.env.DB_HOST || process.env.PGHOST;
  const login = process.env.DB_LOGIN || process.env.PGUSER;
  const password = process.env.DB_PASSWORD || process.env.PGPASSWORD;
  const dbName = process.env.DB_NAME || process.env.PGDATABASE;
  const port = process.env.DB_PORT || process.env.PGPORT;
  const poolSize = Number(process.env.POOL_SIZE);

  if (
    !host ||
    !login ||
    !dbName ||
    !password ||
    !port ||
    isNaN(+port) ||
    isNaN(poolSize)
  ) {
    throw new Error(
      '[Config selector]: required env db variables not defined or invalid',
    );
  }

  const config: IDatabaseConfig = {
    host: host,
    port: +port,
    userName: login,
    password: password,
    dbName: dbName,
    poolSize,
  };

  return config;
});

import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName:
    process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'local_migrations',
  migrations: ['./dist/migrations/**/*{.ts,.js}'],
  entities: ['./dist/src/**/*.entity{.ts,.js}'],
  logging: true,
});

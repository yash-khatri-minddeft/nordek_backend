import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { IDatabaseConfig } from 'src/configs/database.config';
import { IAppConfig } from 'src/configs/app.config';
import { ConfigNames } from 'src/common/enums';
import { CustomNamingStrategy } from 'src/infrastructure/database';

@Injectable()
export class DatabaseConnection implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const appConfig = this.configService.get<IAppConfig>(ConfigNames.APP);
    const databaseConfig = this.configService.get<IDatabaseConfig>(
      ConfigNames.DATABASE,
    );
    if (!databaseConfig || !appConfig) {
      throw new Error('Database config does not exists');
    }
    return {
      type: 'postgres',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.userName,
      password: databaseConfig.password,
      database: databaseConfig.dbName,
      synchronize: appConfig.isLocal,
      autoLoadEntities: true,
      migrationsRun: !appConfig.isLocal,
      entities: ['./dist/src/entities/**/*.entity{.ts,.js}'],
      migrations: ['./dist/migrations/**/*{.ts,.js}'],
      migrationsTableName:
        process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'local_migrations',
      logging: appConfig?.isLocal,
      namingStrategy: new CustomNamingStrategy(),
      poolSize: databaseConfig.poolSize,
    };
  }
}

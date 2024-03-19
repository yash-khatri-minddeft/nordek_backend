import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { IAppConfig } from './configs/app.config';
import { AppModule } from './modules/app/app.module';
import { ConfigNames } from './common/enums/config-names.enum';
import { setupSwagger } from './utils/setupSwagger';
import { secretLoader } from './utils/secretLoader';

async function bootstrap() {
  await secretLoader();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.use(cookieParser());

  setupSwagger(app);

  const configService = app.get(ConfigService);
  const config = configService.get<IAppConfig>(ConfigNames.APP);

  if (!config) {
    throw new Error('App config does not exists');
  }

  await app.listen(config.port);
}
bootstrap();

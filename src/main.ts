import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3002);
  const corsOrigin = configService.get('CORS_DOMAIN', 'http://localhost:3000');

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    origin: [corsOrigin],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  await app.listen(port);
}
bootstrap();

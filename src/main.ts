import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3002);

  app.setGlobalPrefix('api');
  //app.use(cookieParser());
  //app.enableCors({
  //  origin: ['http://localhost:3000'],
  //  credentials: true,
  //  exposedHeaders: 'set-cookie',
  //});

  await app.listen(port);
}
bootstrap();

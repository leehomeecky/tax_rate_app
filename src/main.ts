import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

config();

const { PORT: port } = process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(+port || 9500);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
require('dotenv').config();

async function bootstrap() {

  const logger = new Logger('AppLogger', { timestamp: true });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server running on port ${process.env.PORT}`)

}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  CustomExceptionFilter,
  handleValidatorException,
} from './shared/exception/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: handleValidatorException,
    }),
  );
  const port = app.get(ConfigService).get<number>('PORT');
  await app.listen(port);
}
bootstrap();

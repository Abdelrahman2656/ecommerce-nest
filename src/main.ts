import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //helmet
  app.use(helmet())
  //cors
  app.enableCors({
    origin: '*',
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH'],
   
  });
  //validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

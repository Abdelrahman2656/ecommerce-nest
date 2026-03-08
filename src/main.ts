import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //helmet
  app.use(helmet());
  //cors
  app.enableCors({
    origin: '*',
    methods: ['PUT', 'POST', 'GET', 'DELETE', 'PATCH'],
  });
  //swagger
  const swagger = new DocumentBuilder().addServer("http://localhost:3000/")
    .setTitle('Ecommerce Nest')
    .setDescription('Your Api Description')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  const documentation = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, documentation);

  //validation
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();
  const views = join(__dirname, '..', 'views');
  const staticAssets = join(__dirname, '..', 'static');
  
  app.useStaticAssets(staticAssets);

  nunjucks.configure(views, {
    express,
    autoescape: true, 
    watch: true,      
  });

   app.enableCors({
     origin: 'http://localhost:5173', 
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
   });
  app.enableCors();

  await app.listen(3000);
}

bootstrap();

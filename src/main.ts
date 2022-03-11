import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { join } from 'path';
var express = require('express');
const bodyParser = require('body-parser');
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    { cors: true }
  );
  
  app.use(bodyParser.json({
    extended: true,
    limit: '50mb'
  }));


  app.use(express.static('public')); 
  app.use('/public', express.static('public'));

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3000);
  //console.log(process.env.MONGODB_URL);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyInstance, fastify, FastifyLoggerOptions } from 'fastify';

import { AppModule } from './app/app.module';

interface NestApp {
  app: NestFastifyApplication;
  instance: FastifyInstance;
}

const loggerConfig = {
  disableRequestLogging: true,
  prettyPrint: !!process.env.FASTIFY_LOGGER_PRETTY_PRINT,
};

export async function bootstrap(): Promise<NestApp> {
  const instance: FastifyInstance = fastify(
    loggerConfig as FastifyLoggerOptions
  );
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance)
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.init();
  return { app, instance };
}

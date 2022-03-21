import { MakePiEnvironment } from './environment.interface';

export const environment: MakePiEnvironment = {
  production: true,
  port: process.env.PORT ? Number(process.env.PORT) : 8080,
};

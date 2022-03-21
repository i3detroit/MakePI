import { bootstrap } from './app';
import { environment } from './environments/environment';

(async () => {
  const port = process.env.PORT ? Number(process.env.PORT) : environment.port;
  const fastifyInstance = await bootstrap();
  await fastifyInstance.instance.listen(port, '0.0.0.0');
})().catch(console.error.bind(console));

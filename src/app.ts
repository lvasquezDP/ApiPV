import { envs } from './config/envs';
import { Server } from './server/server';
import { AppRoutes } from './server/routes';

(async()=> {
  main();
})();

async function main() {
  const server = new Server(envs.PORT);
  server.setRoutes(AppRoutes.routes);
  server.start();
}
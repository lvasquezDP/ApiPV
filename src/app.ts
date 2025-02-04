import { envs } from "./config/envs";
import { Server } from "./server/server";
import { AppRoutes } from "./server/routes";
import { createServer } from "http";
import { WssService } from "./server/services/wss.service";

(async () => {
  main();
})();
//prueba usuarios
async function main() {
  const server = new Server(envs.PORT);
  
  // const httpServer=createServer(server.app);
  // WssService.initWss({server:httpServer});
  // server.setRoutes(AppRoutes.routes);
  // httpServer.listen(envs.PORT,'0.0.0.0',()=>{
  //   console.log(`Server running on port ${ envs.PORT }`);
  // })
  // WssService.instance.start();

  server.setRoutes(AppRoutes.routes);
  server.start();
}
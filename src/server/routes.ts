import { Router } from "express";
import { AuthMiddleware } from "../rules/middleware/auth.middleware";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir las rutas
    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api", AuthMiddleware.validateJWT, this.api);


    return router;
  }

  static get api(): Router {
    const router = Router();

    // router.use("/category", CategoryRoutes.routes);
    
    return router;
  }
}

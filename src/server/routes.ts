import { Router } from "express";
import { AuthMiddleware } from "../rules/middleware/auth.middleware";
import { AuthRoutes } from "./auth/routes";
import { StoreRoutes } from "./store/routes";
import { ProveedorRoutes } from "./proveedor/routes";
import { ProductosRoute } from "./product/routes";

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

    router.use("/store", StoreRoutes.routes);
    router.use("/proveedor", ProveedorRoutes.routes);
    router.use("/product", ProductosRoute.routes);
    
    return router;
  }
}

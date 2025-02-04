import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware, register_proveedor_Request, update_proveedor_Request, validator, validatorFiles } from "../../rules";
import { ProveedorController } from "./controller";
import { ProveedorService } from "../services/proveedor.service";

export class ProveedorRoutes {
  static get routes(): Router {
    const router = Router();

    const middleware = (req: Request, res: Response, next: NextFunction) =>
      AuthMiddleware.validateRol(req, res, next, "ADMINISTRADOR");

    const controller = new ProveedorController(new ProveedorService());

    router.post("/register", middleware, validatorFiles, validator(register_proveedor_Request), controller.register);
    router.post("/update", middleware, validatorFiles, validator(update_proveedor_Request), controller.update);
    router.get("/show/:id", controller.show);
    router.get("/", controller.index);
    router.get("/products/:id", controller.products);

    return router;
  }
}

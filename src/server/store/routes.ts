import { NextFunction, Request, Response, Router } from "express";
import {
  AuthMiddleware,
  register_productStore_Request,
  register_store_Request,
  update_store_Request,
  validator,
  validatorFiles,
} from "../../rules";
import { StoreController } from "./controller";
import { StoreService } from "../services/store.service";
import { EmailService } from "../../plugins";

export class StoreRoutes {
  static get routes(): Router {
    const router = Router();

    const middleware = (req: Request, res: Response, next: NextFunction) =>
      AuthMiddleware.validateRol(req, res, next, "ADMINISTRADOR");

    const controller = new StoreController(new StoreService(new EmailService()));

    router.get("/", controller.index);
    router.get("/show/:id", controller.show);
    router.post("/register", middleware, validator(register_store_Request), controller.register);
    router.post("/update", middleware, validator(update_store_Request),controller.update);

    router.use("/product", this.productos(controller));
    return router;
  }

  private static productos(controller: StoreController): Router {
    const router = Router();

    router.get("/", controller.products);
    router.get("/:codigo", controller.codigo);
    router.post("/register", validatorFiles, validator(register_productStore_Request), controller.registerProduct);
    router.post("/update", validatorFiles, validator(register_productStore_Request), controller.updateProducto);
    
    return router;
  }
}

import { Router } from "express";
import { ProductosController } from "./controller";
import { ProductoService } from "../services/producto.service";
import { register_proveedor_Request, update_proveedor_Request, validator, validatorFiles } from "../../rules";

export class ProductosRoute {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductosController(new ProductoService());

    router.get("/:codigo",controller.show);
    router.post("/register", validatorFiles, validator(register_proveedor_Request) ,controller.register);
    router.post("/update", validatorFiles, validator(update_proveedor_Request) ,controller.update);

    return router;
  }
}

import { Router } from "express";
import { ProductosController } from "./controller";
import { ProductoService } from "../services/producto.service";
import { register_product_Request, update_product_Request, validator, validatorFiles } from "../../rules";

export class ProductosRoute {
  static get routes(): Router {
    const router = Router();

    const controller = new ProductosController(new ProductoService());

    router.get("/:codigo",controller.show);
    router.post("/register", validatorFiles, validator(register_product_Request) ,controller.register);
    router.post("/update", validatorFiles, validator(update_product_Request) ,controller.update);

    return router;
  }
}

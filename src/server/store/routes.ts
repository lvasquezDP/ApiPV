import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware, register_store_Request, validator } from "../../rules";
import { StoreController } from "./controller";
import { StoreService } from "../services/store.service";
import { EmailService } from "../../plugins";

export class StoreRoutes {
  static get routes(): Router {
    const router = Router();

    const middleware = (req: Request, res: Response, next: NextFunction) =>
      AuthMiddleware.validateRol(req, res, next, "ADMINISTRADOR");

    const controller = new StoreController(
      new StoreService(new EmailService())
    );

    router.post("/register", middleware, validator(register_store_Request), controller.register);
    router.post("/update", middleware, controller.update);
    router.get("/show/:id", controller.show);

    return router;
  }
}

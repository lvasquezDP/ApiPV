import { Router } from "express";
import { AuthController } from "./controller";
import { EmailService } from "../../plugins";
import { AuthService } from "../services/auth.service";
import { login_user_Request } from "../../rules/dtos/auth/login-user.request";
import { register_user_Request, validator } from "../../rules";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController(new AuthService(new EmailService()));

    // Definir las rutas
    router.post("/login", validator(login_user_Request), controller.login);
    router.post("/register", validator(register_user_Request), controller.register);
    router.get("/validate-email/:token", controller.validate);

    return router;
  }
}

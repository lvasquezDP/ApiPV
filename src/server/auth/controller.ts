import { Request, Response } from "express";
import { handleError, loginUserDTO, RegisterUserDTO } from "../../rules";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  login = (req: Request, res: Response) => {
    const { errors, data } = loginUserDTO.create(req.body);
    if (errors) return handleError(errors, res),undefined;
    this.authService
      .loginUser(data!)
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  };

  register = (req: Request, res: Response) => {
    const { errors, data } = RegisterUserDTO.create(req.body);
    if (errors) return handleError(errors, res),undefined;

    this.authService
      .registerUser(data!)
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  };

  validate = (req: Request, res: Response) => {
    this.authService
      .validate(req.params.token)
      .then(() => res.json('Email validated'))
      .catch((err) => handleError(err, res));
  };
}

import { Request, Response } from "express";
import { CustomError, loginUserDTO, RegisterUserDTO } from "../../rules";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  private handleError = (errors: unknown, res: Response) => {
    if (errors instanceof CustomError)
      return res.status(errors.code).json(errors.getError);
    return res.status(400).json({ errors });
  };

  login = (req: Request, res: Response) => {
    const { errors, data } = loginUserDTO.create(req.body);
    if (errors) return this.handleError(errors, res),undefined;
    this.authService
      .loginUser(data!)
      .then((user) => res.json(user))
      .catch((err) => this.handleError(err, res));
  };

  register = (req: Request, res: Response) => {
    const { errors, data } = RegisterUserDTO.create(req.body);
    if (errors) return this.handleError(errors, res),undefined;

    this.authService
      .registerUser(data!)
      .then((user) => res.json(user))
      .catch((err) => this.handleError(err, res));
  };

  validate = (req: Request, res: Response) => {
    this.authService
      .validate(req.params.token)
      .then(() => res.json('Email validated'))
      .catch((err) => this.handleError(err, res));
  };
}

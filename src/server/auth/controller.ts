import { Request, Response } from "express";
import { handleError } from "../../rules";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(public readonly service: AuthService) {}

  login = (req: Request, res: Response) => {
    this.service
      .loginUser(req.body.request)
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  };

  register = (req: Request, res: Response) => {
    this.service
      .registerUser(req.body.request)
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  };

  refresh = (req: Request, res: Response) => {
    this.service
      .refresh(req.params.token)
      .then((user) => res.json(user))
      .catch((err) => handleError(err, res));
  };

  validate = (req: Request, res: Response) => {
    this.service
      .validate(req.params.token)
      .then(() => res.json('Email validated'))
      .catch((err) => handleError(err, res));
  };
}

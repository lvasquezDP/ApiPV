import { Request, Response } from "express";
import { StoreService } from "../services/store.service";
import { handleError } from "../../rules";

export class StoreController {
  constructor(private readonly service: StoreService) {}

  index = (req: Request, res: Response) => {
    this.service
      .index()
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  register = (req: Request, res: Response) => {
    this.service
      .register(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    this.service
      .update(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  show = (req: Request, res: Response) => {
    this.service
      .show(+req.params.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };
}

import { Request, Response } from "express";
import { StoreService } from "../services/store.service";
import { handleError } from "../../rules";

export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  register = (req: Request, res: Response) => {
    this.storeService
      .registerStore(req.body.request)
      .then(res.json)
      .catch((err) => handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    this.storeService
      .registerStore(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  show = (req: Request, res: Response) => {
    this.storeService
      .show(+req.params.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };
}

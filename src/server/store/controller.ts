import { Request, Response } from "express";
import { StoreService } from "../services/store.service";
import { handleError } from "../../rules";
import { RegisterStoreDTO } from "../../rules/dtos/store/register-store.dto";

export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  register = (req: Request, res: Response) => {
    const { errors, data } = RegisterStoreDTO.create(req.body);
    if (errors) return handleError(errors, res), undefined;
    this.storeService
      .registerStore(data!)
      .then(res.json)
      .catch((err) => handleError(err, res));
  };

  update = (req: Request, res: Response) => {
    const { errors, data } = RegisterStoreDTO.create(req.body);
    if (errors) return handleError(errors, res), undefined;
    this.storeService
      .registerStore(data!)
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

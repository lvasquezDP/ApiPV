import { Request, Response } from "express";
import { handleError } from "../../rules";
import { ProveedorService } from "../services/proveedor.service";

export class ProveedorController {
  constructor(private readonly service: ProveedorService) {}

  register = (req: Request, res: Response) => {
    this.service
      .register(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  index = (req: Request, res: Response) => {
    this.service
      .index()
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
  
  products = (req: Request, res: Response) => {
    this.service
      .products(+req.params.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };
}

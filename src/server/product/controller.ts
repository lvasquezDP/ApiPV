import { Request, Response } from "express";
import { ProductoService } from "../services/producto.service";
import { handleError } from "../../rules";

export class ProductosController {
  constructor(private readonly service: ProductoService) {}
  register = (req: Request, res: Response) => {
    this.service
      .register(req.body.request)
      .then((x) => res.json(x))
      .catch((e) => handleError(e, res));
  };
  update = (req: Request, res: Response) => {
    this.service
      .update(req.body.request)
      .then((x) => res.json(x))
      .catch((e) => handleError(e, res));
  };
  show = (req: Request, res: Response) => {
    this.service
      .show(req.params.codigo)
      .then((x) => res.json(x))
      .catch((e) => handleError(e, res));
  };
}

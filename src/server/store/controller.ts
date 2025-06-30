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

  show = (req: Request, res: Response) => {
    this.service
      .show(+req.params.id)
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

  // productos

  codigo = (req: Request, res: Response) => {
    this.service
      .codigo(req.params.codigo, +req.body.user.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  products = (req: Request, res: Response) => {
    this.service
      .products(+req.body.user.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  registerProduct = (req: Request, res: Response) => {
    this.service
      .registerProduct(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  updateProducto = (req: Request, res: Response) => {
    this.service
      .updateProducto(req.body.request)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  // ventas

  venta = (req: Request, res: Response) => {
    this.service
      .venta(+req.params.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  ventas = (req: Request, res: Response) => {
    this.service
      .ventas(+req.params.tiendaId)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

  registerVenta = (req: Request, res: Response) => {
    this.service
      .registerVenta(req.body.request,+req.body.user.id)
      .then((x) => res.json(x))
      .catch((err) => handleError(err, res));
  };

}

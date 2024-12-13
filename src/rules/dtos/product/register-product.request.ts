import "joi-extract-type";
import * as Joi from "@hapi/joi";

export const register_product_Request = {
  codigo: Joi.string().required(),
  nombre: Joi.string().required(),
  nombrePublico: Joi.string().required(),
  descripcion: Joi.string().required(),
  precio: Joi.number().required(),
  proveedorId: Joi.number().required(),
  img: Joi.any(),
};

export type RegisterProductDTO = Joi.extractType<typeof register_product_Request>;

export const update_product_Request = {
  id: Joi.number().required(),
  codigo: Joi.string(),
  nombre: Joi.string(),
  nombrePublico: Joi.string(),
  descripcion: Joi.string(),
  precio: Joi.number(),
  proveedorId: Joi.number(),
  img: Joi.any(),
};

export type UpdateProductoDTO = Joi.extractType<typeof update_product_Request>;

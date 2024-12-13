import "joi-extract-type";
import * as Joi from "@hapi/joi";

export const register_proveedor_Request = {
  nombre: Joi.string().required(),
  contacto: Joi.string().required().email({ minDomainSegments: 2 }),
  direccion: Joi.string().required(),
  img: Joi.any(),
};

export type RegisterProveedorDTO = Joi.extractType<
  typeof register_proveedor_Request
>;

export const update_proveedor_Request = {
  id: Joi.number().required(),
  nombre: Joi.string(),
  contacto: Joi.string().email({ minDomainSegments: 2 }),
  direccion: Joi.string(),
  img: Joi.any(),
};

export type UpdateProveedorDTO = Joi.extractType<
  typeof update_proveedor_Request
>;

import "joi-extract-type";
import * as Joi from "@hapi/joi";

export const register_store_Request = {
  nombre: Joi.string().required(),
  contacto: Joi.string().required().email({ minDomainSegments: 2 }),
  direccion: Joi.string().required(),
  img: Joi.any(),
};

export type RegisterStoreDTO = Joi.extractType<typeof register_store_Request>;


export const update_store_Request = {
  id: Joi.number().required(),
  nombre: Joi.string(),
  contacto: Joi.string().email({ minDomainSegments: 2 }),
  direccion: Joi.string(),
  img: Joi.any(),
};

export type UpdateStoreDTO = Joi.extractType<typeof update_store_Request>;

import "joi-extract-type";
import * as Joi from "@hapi/joi";

export const register_store_Request = {
  nombre: Joi.string().required(),
  contacto: Joi.string().required().email({ minDomainSegments: 2 }),
  direccion: Joi.string().required()
};

export type RegisterStoreDTO = Joi.extractType<typeof register_store_Request>;

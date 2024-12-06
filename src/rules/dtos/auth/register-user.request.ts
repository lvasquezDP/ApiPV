import "joi-extract-type";
import * as Joi from "@hapi/joi";
import { $Enums } from "@prisma/client";

export const register_user_Request = {
  nombre: Joi.string().required(),
  correo: Joi.string().required().email({ minDomainSegments: 2 }),
  contraseña: Joi.string().required().min(6),
  rol: Joi.string().valid(Object.values($Enums.Rol)).required(),
  tiendaId: Joi.number().required(),
  img: Joi.any(),
};

export type RegisterUserDTO = Joi.extractType<typeof register_user_Request>;

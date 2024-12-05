import "joi-extract-type";
import * as Joi from "@hapi/joi";

export const login_user_Request = {
  contraseña: Joi.string().required().min(6),
  correo: Joi.string().required().email({
    minDomainSegments: 2,
  }),
};

export type LoginUserDTO = Joi.extractType<typeof login_user_Request>;

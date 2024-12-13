import { NextFunction, Request, Response } from "express";
import * as Joi from "@hapi/joi";

export const validator =
  (object: Joi.SchemaMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    const temp=req.body.user;
    delete req.body.user;
    const { error, value } = Joi.object(object).validate(req.body, {
    //   messages: { ...require("../helpers/joiCustomErrors") },
      abortEarly: false,
    });

    req.body.user=temp;
    if (error)
        return res.status(400).json(
            error.details.reduce((a,json) => ({ ...a, [json.context?.label ?? ""]: json.message }) ,{})
        ), undefined;

    req.body.request=value;
    next();
  };

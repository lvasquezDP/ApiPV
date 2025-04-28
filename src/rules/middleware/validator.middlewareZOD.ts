import { NextFunction, Request, Response } from "express";
import { ZodEffects, ZodSchema, ZodTypeAny } from "zod";

export const validator =
  <T>(schema: ZodSchema<T> | ZodEffects<ZodTypeAny>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const temp = req.body.user;
    delete req.body.user;

    const result = schema.safeParse(req.body);

    req.body.user = temp;

    if (!result.success) {
      // Formateamos los errores en un objeto clave:mensaje
      const formattedErrors = result.error.errors.reduce((acc, err) => {
        const key = err.path.join(".") || "unknown";
        acc[key] = err.message;
        return acc;
      }, {} as Record<string, string>);

      return res.status(400).json(formattedErrors), undefined;
    }

    req.body.request = result.data;
    next();
  };

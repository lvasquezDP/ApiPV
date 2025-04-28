import { z } from "zod";
import { UploadedFile } from "express-fileupload";
import {
  register_product_Request,
  RegisterProductDTO,
} from "../product/register-product.request";

export const register_store_Request = z.object({
  nombre: z.string(),
  contacto: z.string().email(),
  direccion: z.string(),
  img: z
    .custom<UploadedFile>()
    .optional()
    .refine((file) => !Array.isArray(file), {
      message: "Solo se permite un archivo, no múltiples.",
    }),
});

export type RegisterStoreDTO = z.infer<typeof register_store_Request>;

export const update_store_Request = register_store_Request
  .partial()
  .extend({ id: z.number() });

export type UpdateStoreDTO = z.infer<typeof update_store_Request>;

export const register_productStore_Request = z
  .object({
    producto: z
      .string()
      .transform((str, ctx) => {
        try {
          return JSON.parse(str);
        } catch (e) {
          ctx.addIssue({
            code: "custom",
            path: ["producto"],
            message: "Invalid JSON",
          });
          return z.NEVER;
        }
      })
      .pipe(register_product_Request)
      .optional(),
    // producto: register_product_Request.optional(),
    productoId: z.coerce.number().optional(),
    tiendaId: z.coerce.number(),
    precioCompra: z.coerce.number(),
    precioVenta: z.coerce.number(),
    stock: z.coerce.number(),
    minStock: z.coerce.number(),
    img: z
      .custom<UploadedFile>()
      .optional()
      .refine((file) => !Array.isArray(file), {
        message: "Solo se permite un archivo, no múltiples.",
      }),
  })
  .refine(
    (data) => {
      return data.producto || data.productoId;
    },
    {
      message: "Debe incluir 'producto' o 'productoId'",
      path: ["producto"],
    }
  );

export type RegisterProductStoreDTO = z.infer<
  typeof register_productStore_Request
>;

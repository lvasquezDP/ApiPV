import { z } from "zod";
import { UploadedFile } from "express-fileupload";
import { register_product_Request } from "../product/register-product.request";

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
    product: register_product_Request.optional(),
    productoId: z.number().optional(),
    tiendaId: z.number(),
    precioCompra: z.number(),
    precioVenta: z.number(),
    stock: z.number(),
    minStock: z.number(),
  })
  .refine((data) => data.product || data.productoId, {
    message: "Debe incluir 'product' o 'productoId'",
    path: ["product"],
  });

export type RegisterProductStoreDTO = z.infer<
  typeof register_productStore_Request
>;

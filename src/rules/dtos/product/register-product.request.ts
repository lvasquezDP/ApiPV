import { z } from "zod";
import { UploadedFile } from "express-fileupload";

export const register_product_Request = z.object({
  codigo: z.string(),
  nombre: z.string(),
  nombrePublico: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  proveedorId: z.number(),
  img: z.custom<UploadedFile>().optional(),
});

export type RegisterProductDTO = z.infer<typeof register_product_Request>;

export const update_product_Request = register_product_Request
  .partial()
  .extend({ id: z.number() });

export type UpdateProductoDTO = z.infer<typeof update_product_Request>;

export const register_precioTienda_Request = z
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

export type RegisterPrecioTiendaDTO = z.infer<
  typeof register_precioTienda_Request
>;

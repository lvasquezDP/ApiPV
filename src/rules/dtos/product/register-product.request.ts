import { z } from "zod";
import { UploadedFile } from "express-fileupload";
import { register_proveedor_Request } from "../proveedor/register-proveedor.request";

const baseProductSchema = z.object({
  proveedor: register_proveedor_Request.optional(),
  proveedorId: z.coerce.number().optional(),
  codigo: z.string(),
  nombre: z.string(),
  nombrePublico: z.string(),
  descripcion: z.string(),
  precio: z.coerce.number(),
  img: z.custom<UploadedFile>().optional()
  .refine(
    (file) => !Array.isArray(file),
    { message: "Solo se permite un archivo, no múltiples." }
  ),
});

export const register_product_Request = baseProductSchema.refine((data) => data.proveedor || data.proveedorId, {
  message: "Debe incluir 'proveedor'",
  path: ["proveedorId"],
});

export type RegisterProductDTO = z.infer<typeof register_product_Request>;

export const update_product_Request = baseProductSchema
  .partial()
  .extend({ id: z.number() }).refine((data) => data.proveedor || data.proveedorId, {
    message: "Debe incluir 'proveedor'",
    path: ["proveedor"],
  });

export type UpdateProductoDTO = z.infer<typeof update_product_Request>;

import { z } from "zod";
import { UploadedFile } from "express-fileupload";

export const register_proveedor_Request = z.object({
    nombre: z.string(),
    contacto: z.string().email(),
    direccion: z.string(),
    img: z.custom<UploadedFile>().optional()
    .refine(
      (file) => !Array.isArray(file),
      { message: "Solo se permite un archivo, no múltiples." }
    ),
});

export type RegisterProveedorDTO = z.infer<typeof register_proveedor_Request>;

export const update_proveedor_Request = register_proveedor_Request
  .partial()
  .extend({ id: z.number() });

  export type UpdateProveedorDTO = z.infer<typeof update_proveedor_Request>;
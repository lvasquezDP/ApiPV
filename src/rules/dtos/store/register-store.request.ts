import { z } from "zod";
import { UploadedFile } from "express-fileupload";

export const register_store_Request = z.object({
  nombre: z.string(),
  contacto: z.string().email(),
  direccion: z.string(),
  img: z.custom<UploadedFile>().optional(),
});

export type RegisterStoreDTO = z.infer<typeof register_store_Request>;

export const update_store_Request = register_store_Request
  .partial()
  .extend({ id: z.number() });

export type UpdateStoreDTO = z.infer<typeof update_store_Request>;

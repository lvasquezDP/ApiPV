import { z } from "zod";
import { UploadedFile } from "express-fileupload";
import { Rol } from "@prisma/client";

export const register_user_Request = z.object({
  nombre: z.string(),
  correo: z.string().email(),
  contraseña: z.string().min(6),
  rol: z.nativeEnum(Rol),
  tiendaId: z.number(),
  img: z
    .custom<UploadedFile>()
    .optional()
    .refine((file) => !Array.isArray(file), {
      message: "Solo se permite un archivo, no múltiples.",
    }),
});

export type RegisterUserDTO = z.infer<typeof register_user_Request>;

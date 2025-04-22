import { z } from "zod";

export const login_user_Request = z.object({
  contraseña: z.string().min(6),
  correo: z.string().email(),
  save: z.boolean().optional(),
});
export type LoginUserDTO = z.infer<typeof login_user_Request>;
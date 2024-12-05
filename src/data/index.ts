import { PrismaClient } from "@prisma/client";
import { envs } from "../config";

export const prisma = new PrismaClient().$extends({
    result:{
        usuario:{
// img
        }
    },
  query: {
    usuario: {

      async findUnique({ args, query }) {
        const usuario = await query(args);
        if (usuario?.img) usuario.img = `${envs.WEBSERVICE_URL}${usuario.img}`;
        return usuario;
      },
    },
  },
});

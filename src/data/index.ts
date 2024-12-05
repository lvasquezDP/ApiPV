import { PrismaClient } from "@prisma/client";
import { envs } from "../config";

export const prisma = new PrismaClient().$extends({
    result:{
      usuario:{
        img:{
          compute: (x)=> x.img&&= `${envs.WEBSERVICE_URL}${x.img}`
        }
      },
      tienda:{
        img:{
          compute: (x)=> x.img&&= `${envs.WEBSERVICE_URL}${x.img}`
        }
      }
    },
});

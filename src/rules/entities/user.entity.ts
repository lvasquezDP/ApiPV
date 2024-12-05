import { Tienda } from "@prisma/client";
import { CustomError } from "../errors/custom.error";
import { envs } from "../../config";


export class UserEntity {
  constructor(
    public id: string,
    public nombre: string,
    public correo: string,
    public correoValido: boolean,
    public contraseña: string,
    public rol: string[],
    public img?: string,
    public relations?: any,
  ) {}

  get user(){
    return {
      id: this.id,
      nombre: this.nombre,
      correo: this.correo,
      correoValido: this.correoValido,
      rol: this.rol,
      img: this.img && `${envs.WEBSERVICE_URL}${this.img}`,
      ...this.relations
    }
  }
  
  static fromObject(obj: { [key: string]: any }) {
    const { id, _id, nombre, correo, correoValido, contraseña, rol, img, ...relations } = obj;
    if (!_id && !id) throw CustomError.badRequest("Sin id");
    if (!nombre) throw CustomError.badRequest("Sin nombre");
    if (!correo) throw CustomError.badRequest("Sin correo");
    if (!correoValido == false) throw CustomError.badRequest("Sin correoValidated");
    if (!contraseña) throw CustomError.badRequest("Sin contraseña");
    if (!rol) throw CustomError.badRequest("Sin rol");
    return new UserEntity(_id||id,nombre, correo, correoValido, contraseña, rol, img, relations);
  }
}

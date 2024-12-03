import { CustomError } from "../errors/custom.error";


export class UserEntity {
  constructor(
    public id: string,
    public nombre: string,
    public correo: string,
    public correoValido: boolean,
    public contraseña: string,
    public rol: string[],
    public img?: string
  ) {}
  static fromObject(obj: { [key: string]: any }) {
    const { id, _id, nombre, correo, correoValido, contraseña, rol, img } = obj;
    if (!_id && !id) throw CustomError.badRequest("Sin id");
    if (!nombre) throw CustomError.badRequest("Sin nombre");
    if (!correo) throw CustomError.badRequest("Sin correo");
    if (!correoValido == undefined) throw CustomError.badRequest("Sin correoValidated");
    if (!contraseña) throw CustomError.badRequest("Sin contraseña");
    if (!rol) throw CustomError.badRequest("Sin rol");
    return new UserEntity(_id||id,nombre, correo, correoValido, contraseña, rol, img);
  }
}

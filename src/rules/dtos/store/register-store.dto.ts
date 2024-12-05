import { regularExps } from "../../../config";

type Obj = { [key: string]: any };

export class RegisterStoreDTO {
  constructor(
    public readonly nombre: string,
    public readonly contacto: string,
    public readonly direccion: string
  ) {}

  static create(obj: Obj): { errors?: Obj; data?: RegisterStoreDTO } {
    const { nombre, contacto, direccion } = obj;
    const errors: Obj = {};
    if (!nombre) errors.nombre = "Sin nombre";
    if (!contacto) errors.contacto = "Sin contacto";
    if (!direccion) errors.tienda = "Sin direccion";
    else if (!regularExps.correo.test(contacto)) errors.regularExps = "contacto no valido";
    if (Object.keys(errors).length > 0) return { errors };
    return { data: new RegisterStoreDTO(nombre, contacto, direccion) };
  }
}

import { $Enums } from "@prisma/client";
import { regularExps } from "../../../config";

type Obj={[key:string]:any};


export class RegisterUserDTO {
  constructor(
    public readonly nombre:string,
    public readonly correo:string,
    public readonly contraseña:string,
    public readonly rol:$Enums.Rol,
    public readonly tiendaId:number,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:RegisterUserDTO}{
    const {nombre,correo,contraseña,rol,tiendaId}=obj;
    const errors:Obj={};
    if(!nombre)errors.nombre='Sin nombre';
    if(!correo)errors.correo='Sin correo';
    if(!rol)errors.nombre='Sin rol';
    if(!tiendaId)errors.nombre='Sin tiendaId';
    else if(!regularExps.correo.test(correo))errors.regularExps='Correo no valido';
    if(!contraseña)errors.contraseña='Sin contraseña';
    else if(contraseña.length<6)errors.contraseña='Contraseña muy corta';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new RegisterUserDTO(nombre,correo,contraseña,rol,tiendaId)};
  }
}

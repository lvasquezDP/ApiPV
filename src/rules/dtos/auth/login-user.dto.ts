import { regularExps } from "../../../config";


type Obj={[key:string]:any};


export class loginUserDTO {
  constructor(
    public readonly correo:string,
    public readonly contraseña:string,
  ) {}

  static create(obj:Obj):{errors?:Obj,data?:loginUserDTO}{
    const {correo,contraseña}=obj;
    const errors:Obj={};
    if(!correo)errors.correo='Sin correo';
    else if(!regularExps.correo.test(correo))errors.regularExps='Correo no valido';
    if(!contraseña)errors.contraseña='Sin contraseña';
    else if(contraseña.length<6)errors.contraseña='Contraseña muy corta';
    if(Object.keys(errors).length>0)return {errors}
    return {data:new loginUserDTO(correo,contraseña)};
  }
}

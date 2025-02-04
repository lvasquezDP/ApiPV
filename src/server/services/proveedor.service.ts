import { UploadedFile } from "express-fileupload";
import { prisma } from "../../data";
import { CustomError, RegisterProveedorDTO, UpdateProveedorDTO } from "../../rules";
import { FileUploadService } from "./file-upload.service";

export class ProveedorService {
  constructor() {}

  public async register(DTO: RegisterProveedorDTO) {
    try {
      const proveedor=await prisma.proveedor.create({ data: {...DTO, img:null} });
      let path=null;
      if(DTO.img && !Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile, `proveedor/${proveedor.id}`);
      
      proveedor.img=path;

      return {
        proveedor: await prisma.proveedor.update({data:proveedor,where:{id:proveedor.id}}),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(DTO: UpdateProveedorDTO) {
    try {
      let path=null;
      if(DTO.img && !Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile, `proveedor/${DTO.id}`);
      
      return {
        proveedor: await prisma.proveedor.update({ data: { ...DTO, img: path }, where:{ id: DTO.id } }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async show(id: number) {
    try {
      return {
        proveedor: await prisma.proveedor.findUnique({ where: { id } }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async products(proveedorId: number) {
    try {
      return {
        data: await prisma.producto.findMany({ where: { proveedorId } }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async index() {
    try {
      return {
        data: await prisma.proveedor.findMany(),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

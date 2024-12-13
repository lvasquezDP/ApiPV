import { UploadedFile } from "express-fileupload";
import { prisma } from "../../data";
import { CustomError, RegisterProductDTO, UpdateProductoDTO } from "../../rules";
import { FileUploadService } from "./file-upload.service";

export class ProductoService {
  constructor() {}

  public async register(DTO: RegisterProductDTO) {
    try {
      let path=null;
      if(!Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile,`proveedor/${DTO.proveedorId}/productos`);
      
      return {
        producto: await prisma.producto.create({ data: { ...DTO, img: path } }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(DTO: UpdateProductoDTO) {
    try {
      let path=null;
      if(!Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile,`proveedor/${DTO.proveedorId}/productos`);
      
      return {
        producto: await prisma.producto.update({ data: { ...DTO, img: path }, where:{id:DTO.id} }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async show(codigo: string) {
    try {
      return {
        producto: await prisma.producto.findUnique({ where: { codigo } }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

import { UploadedFile } from "express-fileupload";
import { prisma } from "../../data";
import { EmailService } from "../../plugins";
import { CustomError, RegisterPrecioTiendaDTO, RegisterStoreDTO, UpdateStoreDTO } from "../../rules";
import { FileUploadService } from "./file-upload.service";
import { ProductoService } from "./producto.service";

export class StoreService {
  constructor(private readonly emailService: EmailService) {}

  public async register(DTO: RegisterStoreDTO) {
    try {
      const tienda=await prisma.tienda.create({ data: {...DTO, img:null} });
      let path=null;
      if(DTO.img && !Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile, `tiendas/${tienda.id}`);
      
      tienda.img=path;

      return {
        tienda: await prisma.tienda.update({data:tienda,where:{id:tienda.id}}),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async precioTienda(DTO: RegisterPrecioTiendaDTO) {
    try {
      let productoId = DTO.productoId ?? 0;
      if(DTO.product) productoId = (await new ProductoService().register(DTO.product)).producto.id;
      delete DTO.product;
      delete DTO.productoId;
      return {
        precioTienda: await prisma.precioTienda.create({ data: {productoId,...DTO} })
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(DTO: UpdateStoreDTO) {
    try {
      let path=null;
      if(DTO.img && !Array.isArray(DTO.img))
        path=await new FileUploadService().uploadSingle(DTO.img as UploadedFile, `tiendas/${DTO.id}`);
      
      return {
        tienda: await prisma.tienda.update({ data: { ...DTO, img: path}, where:{id:DTO.id} }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async show(id: number) {
    try {
      return {
        tienda: await prisma.tienda.findUnique({
          where: { id },
          include: { usuarios: {select:{nombre:true,correo:true,img:true}} },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async index() {
    try {
      return {
        data: await prisma.tienda.findMany(),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

import { UploadedFile } from "express-fileupload";
import { prisma } from "../../data";
import {
  CustomError,
  RegisterProductDTO,
  UpdateProductoDTO,
} from "../../rules";
import { FileUploadService } from "./file-upload.service";
import { ProveedorService } from "./proveedor.service";

export class ProductoService {
  constructor() {}

  public async register(DTO: RegisterProductDTO) {
    let { proveedor, proveedorId = 0, ...data } = DTO;
    try {
      let path = null;
      if (DTO.img)
        path = await new FileUploadService().uploadSingle(
          DTO.img,
          `proveedor/${DTO.proveedorId}/productos`
        );

      if (proveedor)
        proveedorId = (await new ProveedorService().register(proveedor))
          .proveedor.id;

      return {
        producto: await prisma.producto.create({
          data: { ...data, proveedorId, img: path },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(DTO: UpdateProductoDTO) {
    try {
      let path = null;
      if (DTO.img)
        path = await new FileUploadService().uploadSingle(
          DTO.img,
          `proveedor/${DTO.proveedorId}/productos`
        );

      return {
        producto: await prisma.producto.update({
          data: { ...DTO, img: path, proveedor: undefined },
          where: { id: DTO.id },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async find(take: number, codigo: string) {
    try {
      return {
        productos: await prisma.producto.findMany({
          where: { codigo: { contains: codigo } },
          include: { proveedor: true },
          take,
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

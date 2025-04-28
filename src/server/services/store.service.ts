import { prisma } from "../../data";
import { EmailService } from "../../plugins";
import {
  CustomError,
  RegisterProductStoreDTO,
  RegisterStoreDTO,
  UpdateStoreDTO,
} from "../../rules";
import { FileUploadService } from "./file-upload.service";
import { ProductoService } from "./producto.service";

export class StoreService {
  constructor(private readonly emailService: EmailService) {}

  public async index() {
    try {
      return {
        data: await prisma.tienda.findMany(),
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
          include: {
            usuarios: {
              select: {
                id: true,
                nombre: true,
                correo: true,
                img: true,
                rol: true,
              },
            },
          },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async register(DTO: RegisterStoreDTO) {
    try {
      const tienda = await prisma.tienda.create({
        data: { ...DTO, img: null },
      });
      let path = null;
      if (DTO.img)
        path = await new FileUploadService().uploadSingle(
          DTO.img,
          `tiendas/${tienda.id}`
        );

      tienda.img = path;

      return {
        tienda: await prisma.tienda.update({
          data: tienda,
          where: { id: tienda.id },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async update(DTO: UpdateStoreDTO) {
    try {
      let path = null;
      if (DTO.img)
        path = await new FileUploadService().uploadSingle(
          DTO.img,
          `tiendas/${DTO.id}`
        );

      return {
        tienda: await prisma.tienda.update({
          data: { ...DTO, img: path },
          where: { id: DTO.id },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async codigo(codigo: string, userId: number) {
    try {
      const producto = await prisma.precioTienda.findFirst({
        where: {
          producto: { codigo },
          tienda: { usuarios: { some: { id: userId } } },
        },
        include: { producto: { include: { proveedor: true } } },
      });
      if (!producto) throw "Producto not exist";
      return { producto };
    } catch (error) {
      throw CustomError.notFound(`${error}`);
    }
  }

  public async products(userId: number) {
    try {
      return {
        productos: await prisma.precioTienda.findMany({
          where: {
            tienda: { usuarios: { some: { id: userId } } },
          },
          include: { producto: { include: { proveedor: true } } },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async registerProduct(DTO: RegisterProductStoreDTO) {
    let { producto, productoId = 0, img, ...data } = DTO;
    const exist = await prisma.precioTienda.findFirst({
      where: { tiendaId: DTO.tiendaId, productoId:productoId },
    });
    if (exist) throw CustomError.forbiden("El proucto ya registrado");
    
    try {
      
      if (producto)
        productoId = (await new ProductoService().register({ ...producto, img }))
      .producto.id;

      return {
        precioTienda: await prisma.precioTienda.create({
          data: { ...data, productoId },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async updateProducto(DTO: RegisterProductStoreDTO) {
    let { producto, productoId = 0, img, ...data } = DTO;
    try {
      let productoId = DTO.productoId ?? 0;
      if (producto)
        productoId = (await new ProductoService().register(producto))
          .producto.id;
      return {
        precioTienda: await prisma.precioTienda.create({
          data: { ...data, productoId },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}

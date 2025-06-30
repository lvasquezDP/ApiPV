import { prisma } from "../../data";
import { EmailService } from "../../plugins";
import {
  CustomError,
  RegisterProductStoreDTO,
  RegisterStoreDTO,
  RegisterVentaStoreDTO,
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
      where: { tiendaId: DTO.tiendaId, productoId: productoId },
    });
    if (exist) throw CustomError.forbiden("El proucto ya registrado");

    try {
      if (producto)
        productoId = (
          await new ProductoService().register({ ...producto, img })
        ).producto.id;

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
        productoId = (await new ProductoService().register(producto)).producto
          .id;
      return {
        precioTienda: await prisma.precioTienda.create({
          data: { ...data, productoId },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async ventas(tiendaId: number) {
    try {
      return {
        ventas: await prisma.venta.findMany({
          where: {
            usuario: { tiendaId },
          },
          include: { usuario: true },
        }),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async venta(id: number) {
    try {
      return await prisma.venta.findUnique({
        where: {
          id,
        },
        include: {
          usuario: { include: { tienda: true } },
          detalles: { include: { producto: {include:{producto:true}} } },
        },
      });
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async registerVenta(DTO: RegisterVentaStoreDTO, userId: number) {
    try {
      // Paso 1: obtener los productos desde PrecioTienda
      const productosDB = await prisma.precioTienda.findMany({
        where: {
          id: {
            in: DTO.productos.map((p) => p.id),
          },
        },
      });

      if (productosDB.length !== DTO.productos.length) {
        throw "Uno o más productos no existen";
      }

      // Paso 2: construir los detalles con precio y subtotal
      const detallesVenta = DTO.productos.map((producto) => {
        const info = productosDB.find((p) => p.id === producto.id);
        if (!info) throw `Producto con ID ${producto.id} no encontrado`;

        const precioUnitario = info.precioVenta;
        const subtotal = precioUnitario * producto.cantidad;

        return {
          productoId: producto.id,
          cantidad: producto.cantidad,
          precioUnitario,
          subtotal,
        };
      });

      const total = detallesVenta.reduce((acc, d) => acc + d.subtotal, 0);

      // Paso 3: crear la venta y sus detalles en transacción
      const venta = await prisma.$transaction(async (tx) => {
        const nuevaVenta = await tx.venta.create({
          data: {
            usuarioId: userId,
            total,
          },
        });

        await tx.detalleVenta.createMany({
          data: detallesVenta.map((d) => ({
            ...d,
            ventaId: nuevaVenta.id,
          })),
        });

        return nuevaVenta;
      });

      return venta;
    } catch (error) {
      throw CustomError.internalServer(`Error al registrar venta: ${error}`);
    }
  }
}

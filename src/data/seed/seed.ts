import { prisma } from "..";
import { seedData } from "./data";

(async () => {
  await main();
})();

const random = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    prisma.tienda.deleteMany(),
    prisma.usuario.deleteMany(),
    prisma.proveedor.deleteMany(),
    prisma.producto.deleteMany(),
    prisma.venta.deleteMany(),
    prisma.detalleVenta.deleteMany(),
    prisma.historialCambio.deleteMany(),
  ]);

  await prisma.tienda.createMany({ data: seedData.tiendas });
  const tiendas = await prisma.tienda.findMany();
  await prisma.proveedor.createMany({
    data: seedData.proveedores,
  });
  const proveedores =await prisma.proveedor.findMany();

  await prisma.usuario.createMany({
    data: seedData.users.map((x) => ({
      ...x,
      tiendaId: tiendas[random(tiendas.length - 1)].id,
    })),
  });
  await prisma.producto.createMany({
    data: seedData.products.map((x) => ({
      ...x,
      proveedorId: proveedores[random(proveedores.length - 1)].id,

    })),
  });
  console.log("SEEDED");
}

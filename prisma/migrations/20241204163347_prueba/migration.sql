/*
  Warnings:

  - You are about to drop the column `precioCompra` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the column `precioVenta` on the `Producto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigo]` on the table `Producto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombrePublico` to the `Producto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Rol" ADD VALUE 'ROOT';

-- DropForeignKey
ALTER TABLE "DetalleVenta" DROP CONSTRAINT "DetalleVenta_productoId_fkey";

-- DropForeignKey
ALTER TABLE "HistorialCambio" DROP CONSTRAINT "HistorialCambio_productoId_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "precioCompra",
DROP COLUMN "precioVenta",
ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "nombrePublico" TEXT NOT NULL,
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "PrecioTienda" (
    "id" SERIAL NOT NULL,
    "tiendaId" INTEGER NOT NULL,
    "productoId" INTEGER NOT NULL,
    "precioCompra" DOUBLE PRECISION NOT NULL,
    "precioVenta" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "PrecioTienda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigo_key" ON "Producto"("codigo");

-- AddForeignKey
ALTER TABLE "PrecioTienda" ADD CONSTRAINT "PrecioTienda_tiendaId_fkey" FOREIGN KEY ("tiendaId") REFERENCES "Tienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrecioTienda" ADD CONSTRAINT "PrecioTienda_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleVenta" ADD CONSTRAINT "DetalleVenta_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "PrecioTienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCambio" ADD CONSTRAINT "HistorialCambio_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "PrecioTienda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

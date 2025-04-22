/*
  Warnings:

  - Added the required column `minStock` to the `PrecioTienda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrecioTienda" ADD COLUMN     "minStock" INTEGER NOT NULL;

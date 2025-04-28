/*
  Warnings:

  - The primary key for the `Categorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Categorie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categorieId` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categorieId_fkey";

-- AlterTable
ALTER TABLE "Categorie" DROP CONSTRAINT "Categorie_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categorieId",
ADD COLUMN     "categorieId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

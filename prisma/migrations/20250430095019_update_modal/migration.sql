/*
  Warnings:

  - The primary key for the `Categorie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categorieId_fkey";

-- AlterTable
ALTER TABLE "Categorie" DROP CONSTRAINT "Categorie_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Categorie_id_seq";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categorieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

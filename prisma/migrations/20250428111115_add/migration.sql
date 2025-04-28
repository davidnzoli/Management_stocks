/*
  Warnings:

  - Added the required column `designationCategorie` to the `Categorie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Categorie" ADD COLUMN     "designationCategorie" TEXT NOT NULL;

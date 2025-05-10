-- DropIndex
DROP INDEX "Product_codeBarre_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "codeBarre" SET DEFAULT 'null';

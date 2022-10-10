/*
  Warnings:

  - You are about to drop the `grossDomesticProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "grossDomesticProduct";

-- CreateTable
CREATE TABLE "gross_domestic_product" (
    "date" DATE NOT NULL,
    "value" DECIMAL(9,3) NOT NULL,

    CONSTRAINT "date_pk" PRIMARY KEY ("date")
);

/*
  Warnings:

  - You are about to alter the column `value` on the `interest_rates` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,3)` to `Decimal(5,3)`.

*/
-- AlterTable
ALTER TABLE "interest_rates" ALTER COLUMN "value" SET DATA TYPE DECIMAL(5,3);

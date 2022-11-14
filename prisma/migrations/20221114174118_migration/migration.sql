/*
  Warnings:

  - Made the column `reportDate` on table `earnings_calendar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "earnings_calendar" ALTER COLUMN "reportDate" SET NOT NULL;

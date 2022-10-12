/*
  Warnings:

  - You are about to drop the `earnings_calendar` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "earnings_calendar" DROP CONSTRAINT "earningscalendar_fk";

-- DropTable
DROP TABLE "earnings_calendar";

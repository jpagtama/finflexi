-- AlterTable
ALTER TABLE "earnings" ALTER COLUMN "reportedEPS" SET DATA TYPE DECIMAL(7,2),
ALTER COLUMN "estimatedEPS" SET DATA TYPE DECIMAL(7,2);

-- AlterTable
ALTER TABLE "earnings_calendar" ALTER COLUMN "estimate" SET DATA TYPE DECIMAL(7,2);

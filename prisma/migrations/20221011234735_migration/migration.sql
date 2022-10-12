-- CreateTable
CREATE TABLE "earnings_calendar" (
    "id" TEXT NOT NULL,
    "companyticker" VARCHAR(20) NOT NULL,
    "reportDate" DATE,
    "estimate" DECIMAL(5,2),

    CONSTRAINT "earnings_calendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "earnings_calendar" ADD CONSTRAINT "earningscalendar_fk" FOREIGN KEY ("companyticker") REFERENCES "companies"("ticker") ON DELETE NO ACTION ON UPDATE NO ACTION;

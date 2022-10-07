-- CreateTable
CREATE TABLE "companies" (
    "ticker" VARCHAR(20) NOT NULL,
    "description" VARCHAR(1000),
    "exchange" VARCHAR(10),
    "marketcap" INTEGER,
    "analysttargetprice" DECIMAL(12,2),
    "sharesoutstanding" INTEGER,
    "forwardpe" DECIMAL(6,2),
    "movingavg50" DECIMAL(12,2),
    "movingavg200" DECIMAL(12,2),
    "fiscalyearend" VARCHAR(10),
    "name" VARCHAR(50),

    CONSTRAINT "ticker_pk" PRIMARY KEY ("ticker")
);

-- CreateTable
CREATE TABLE "stock_data_daily" (
    "date" DATE NOT NULL,
    "open" DECIMAL(11,2),
    "close" DECIMAL(11,2),
    "high" DECIMAL(11,2),
    "low" DECIMAL(11,2),
    "volume" INTEGER,
    "companyticker" VARCHAR(20) NOT NULL,

    CONSTRAINT "stock_data_daily_pk" PRIMARY KEY ("date","companyticker")
);

-- AddForeignKey
ALTER TABLE "stock_data_daily" ADD CONSTRAINT "stock_data_daily_company_ticker_fkey" FOREIGN KEY ("companyticker") REFERENCES "companies"("ticker") ON DELETE NO ACTION ON UPDATE NO ACTION;

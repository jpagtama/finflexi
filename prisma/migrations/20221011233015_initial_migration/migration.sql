-- CreateTable
CREATE TABLE "companies" (
    "ticker" VARCHAR(20) NOT NULL,
    "description" VARCHAR(1000),
    "exchange" VARCHAR(10),
    "marketcap" BIGINT,
    "analysttargetprice" DECIMAL(12,2),
    "sharesoutstanding" BIGINT,
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

-- CreateTable
CREATE TABLE "gross_domestic_product" (
    "date" DATE NOT NULL,
    "value" DECIMAL(9,3) NOT NULL,

    CONSTRAINT "gdp_pk" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "interest_rates" (
    "date" DATE NOT NULL,
    "value" DECIMAL(5,3) NOT NULL,

    CONSTRAINT "interestrates_pk" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "consumer_price_index" (
    "date" DATE NOT NULL,
    "value" DECIMAL(7,3) NOT NULL,

    CONSTRAINT "cpi_pk" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "inflation" (
    "date" DATE NOT NULL,
    "value" DECIMAL(6,3) NOT NULL,

    CONSTRAINT "inflation_pk" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "unemployment" (
    "date" DATE NOT NULL,
    "value" DECIMAL(6,3) NOT NULL,

    CONSTRAINT "unemployment_pk" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "earnings" (
    "companyticker" VARCHAR(20) NOT NULL,
    "reportedDate" DATE NOT NULL,
    "reportedEPS" DECIMAL(5,2) NOT NULL,
    "estimatedEPS" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "earnings_pk" PRIMARY KEY ("companyticker","reportedDate")
);

-- AddForeignKey
ALTER TABLE "stock_data_daily" ADD CONSTRAINT "stock_data_daily_company_ticker_fk" FOREIGN KEY ("companyticker") REFERENCES "companies"("ticker") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "earnings" ADD CONSTRAINT "earnings_fk" FOREIGN KEY ("companyticker") REFERENCES "companies"("ticker") ON DELETE NO ACTION ON UPDATE NO ACTION;

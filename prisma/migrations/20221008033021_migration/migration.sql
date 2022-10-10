-- AlterTable
ALTER TABLE "gross_domestic_product" RENAME CONSTRAINT "date_pk" TO "gdp_pk";

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

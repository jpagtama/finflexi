-- CreateTable
CREATE TABLE "interest_rates" (
    "date" DATE NOT NULL,
    "value" DECIMAL(9,3) NOT NULL,

    CONSTRAINT "interestrates_pk" PRIMARY KEY ("date")
);

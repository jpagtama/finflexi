-- CreateTable
CREATE TABLE "watchlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyticker" VARCHAR(20) NOT NULL,
    "order" INTEGER,
    "listName" TEXT,

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_listName_key" ON "watchlist"("userId", "listName");

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_companyticker_fkey" FOREIGN KEY ("companyticker") REFERENCES "companies"("ticker") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[userId,listName,companyticker]` on the table `watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "watchlist_userId_listName_key";

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_userId_listName_companyticker_key" ON "watchlist"("userId", "listName", "companyticker");

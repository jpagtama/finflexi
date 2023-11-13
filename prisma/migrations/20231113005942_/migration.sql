-- DropForeignKey
ALTER TABLE "watchlist" DROP CONSTRAINT "watchlist_userId_fkey";

-- AddForeignKey
ALTER TABLE "watchlist" ADD CONSTRAINT "watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `agentUid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `buyerUid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sellerUid` on the `Message` table. All the data in the column will be lost.
  - Added the required column `uid` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_agentUid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_buyerUid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sellerUid_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "agentUid",
DROP COLUMN "buyerUid",
DROP COLUMN "sellerUid",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "buyer_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Buyer"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "agent_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Agent"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "seller_uid_fkey" FOREIGN KEY ("uid") REFERENCES "Seller"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

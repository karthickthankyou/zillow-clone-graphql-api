-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "agent_uid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "buyer_uid_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "seller_uid_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "agentUid" TEXT,
ADD COLUMN     "buyerUid" TEXT,
ADD COLUMN     "sellerUid" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sellerUid_fkey" FOREIGN KEY ("sellerUid") REFERENCES "Seller"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_buyerUid_fkey" FOREIGN KEY ("buyerUid") REFERENCES "Buyer"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_agentUid_fkey" FOREIGN KEY ("agentUid") REFERENCES "Agent"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

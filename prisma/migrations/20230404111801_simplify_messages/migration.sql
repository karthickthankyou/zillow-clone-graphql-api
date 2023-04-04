/*
  Warnings:

  - You are about to drop the column `agentUid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `buyerUid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sellerUid` on the `Message` table. All the data in the column will be lost.

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
DROP COLUMN "sellerUid";

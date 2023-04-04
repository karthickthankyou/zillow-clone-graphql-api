import { PrismaClient } from '@prisma/client'
import {
  createAgentDocuments,
  createBuyerDocuments,
  createLocationStatsDocuments,
  createPropertyDocuments,
  createSellerDocuments,
} from './functions'

const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.view.deleteMany()
  await prisma.userHome.deleteMany()
  await prisma.message.deleteMany()
  await prisma.property.deleteMany()
  await prisma.bedPrice.deleteMany()
  await prisma.locationStats.deleteMany()

  //   Users
  await prisma.seller.deleteMany()
  await prisma.buyer.deleteMany()
  await prisma.agent.deleteMany()
}

const main = async () => {
  await deleteAll()

  console.log(' --- Creating Agents --- ')
  await createAgentDocuments()
  console.log(' --- Creating Buyers --- ')
  await createBuyerDocuments()
  console.log(' --- Creating Sellers --- ')
  await createSellerDocuments()
  console.log(' --- Creating Properties --- ')
  await createPropertyDocuments()
  console.log(' --- Creating location stats --- ')
  await createLocationStatsDocuments()
}

main()

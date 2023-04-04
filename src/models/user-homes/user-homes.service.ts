import { Injectable } from '@nestjs/common'
import { FindManyUserHomeArgs, FindUniqueUserHomeArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateUserHomeInput } from './dto/create-user-home.input'
import { UpdateUserHomeInput } from './dto/update-user-home.input'

@Injectable()
export class UserHomesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserHomeInput: CreateUserHomeInput) {
    const { buyerUid, propertyId, type } = createUserHomeInput
    return this.prisma.userHome.upsert({
      create: { type, buyerUid, propertyId },
      update: { type },
      where: {
        buyerUid_propertyId: {
          buyerUid,
          propertyId,
        },
      },
    })
  }

  findAll(args: FindManyUserHomeArgs) {
    return this.prisma.userHome.findMany(args)
  }

  findOne(args: FindUniqueUserHomeArgs) {
    return this.prisma.userHome.findUnique(args)
  }

  update(updateUserHomeInput: UpdateUserHomeInput) {
    const { buyerUid_propertyId, ...data } = updateUserHomeInput
    return this.prisma.userHome.update({
      where: { buyerUid_propertyId },
      data: data,
    })
  }

  remove(args: FindUniqueUserHomeArgs) {
    return this.prisma.userHome.delete(args)
  }
}

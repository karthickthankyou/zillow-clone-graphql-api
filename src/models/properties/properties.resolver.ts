import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql'
import { PropertiesService } from './properties.service'
import { Property } from './entities/property.entity'
import { FindManyPropertyArgs, FindUniquePropertyArgs } from './dto/find.args'
import { CreatePropertyInput } from './dto/create-property.input'
import { UpdatePropertyInput } from './dto/update-property.input'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { Seller } from '../sellers/entities/seller.entity'
import { Agent } from '../agents/entities/agent.entity'
import { UserHome } from '../user-homes/entities/user-home.entity'
import { Message } from '../messages/entities/message.entity'
import { View } from '../views/entities/view.entity'
import {
  AllowAuthenticated,
  AllowAuthenticatedOptional,
  GetUser,
} from 'src/common/decorators/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/util'

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Property)
  async createProperty(
    @Args('createPropertyInput') args: CreatePropertyInput,
    @GetUser() user: GetUserType,
  ) {
    console.log('User ', user)
    checkRowLevelPermission(user, args.sellerUid)
    // Create seller.
    const seller = await this.prisma.seller.findUnique({
      where: { uid: user.uid },
    })
    if (!seller?.uid) {
      await this.prisma.seller.create({ data: { uid: user.uid } })
    }

    return this.propertiesService.create(args)
  }

  @Query(() => [Property], { name: 'properties' })
  findAll(@Args() args: FindManyPropertyArgs) {
    return this.propertiesService.findAll(args)
  }

  @AllowAuthenticated()
  @Query(() => [Property], { name: 'myProperties' })
  myHomesList(
    @Args() args: FindManyPropertyArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.prisma.property.findMany({
      ...args,
      where: { ...args.where, sellerUid: user.uid },
    })
  }

  @Query(() => Property, { name: 'property', nullable: true })
  findOne(@Args() args: FindUniquePropertyArgs) {
    return this.propertiesService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Property)
  updateProperty(
    @Args('updatePropertyInput') args: UpdatePropertyInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.sellerUid)
    return this.propertiesService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Property)
  async removeProperty(
    @Args() args: FindUniquePropertyArgs,
    @GetUser() user: GetUserType,
  ) {
    const property = await this.prisma.property.findUnique(args)
    checkRowLevelPermission(user, property.sellerUid)
    return this.propertiesService.remove(args)
  }

  @ResolveField(() => Seller)
  seller(@Parent() parent: Property) {
    return this.prisma.seller.findUnique({
      where: { uid: parent.sellerUid },
    })
  }

  @ResolveField(() => [Agent])
  agents(@Parent() parent: Property) {
    return this.prisma.agent.findMany({
      where: {
        properties: {
          some: { id: parent.id },
        },
      },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => [UserHome])
  async userHomes(@Parent() parent: Property, @GetUser() user: GetUserType) {
    const property = await this.prisma.property.findUnique({
      where: { id: parent.id },
      include: { agents: true },
    })
    checkRowLevelPermission(user, [
      parent.sellerUid,
      ...property.agents.map((agent) => agent.uid),
    ])

    return this.prisma.userHome.findMany({
      where: {
        propertyId: parent.id,
      },
    })
  }
  @AllowAuthenticatedOptional()
  @ResolveField(() => UserHome, { nullable: true })
  async wishlisted(@Parent() parent: Property, @GetUser() user: GetUserType) {
    if (!user?.uid) {
      return null
    }

    const userHome = await this.prisma.userHome.findFirst({
      where: {
        buyerUid: user.uid,
        propertyId: parent.id,
        type: { equals: 'WISHLISTED' },
      },
    })

    return userHome
  }

  @AllowAuthenticated()
  @ResolveField(() => [Message])
  async messages(@Parent() parent: Property, @GetUser() user: GetUserType) {
    const property = await this.prisma.property.findUnique({
      where: { id: parent.id },
      include: { agents: true },
    })
    checkRowLevelPermission(user, [
      parent.sellerUid,
      ...property.agents.map((agent) => agent.uid),
    ])
    return this.prisma.message.findMany({
      where: {
        propertyId: parent.id,
      },
    })
  }

  @AllowAuthenticated()
  @ResolveField(() => [View])
  async views(@Parent() parent: Property, @GetUser() user: GetUserType) {
    const property = await this.prisma.property.findUnique({
      where: { id: parent.id },
      include: { agents: true },
    })
    checkRowLevelPermission(user, [
      parent.sellerUid,
      ...property.agents.map((agent) => agent.uid),
    ])
    return this.prisma.view.findMany({
      where: {
        propertyId: parent.id,
      },
    })
  }
}

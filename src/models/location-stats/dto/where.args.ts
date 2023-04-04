import { Field, InputType } from '@nestjs/graphql'
import { LocationStatsType, Prisma } from '@prisma/client'
import {
  FloatFilter,
  IntFilter,
  StringFilter,
} from 'src/common/dtos/common.input'
import { BedPriceListRelationFilter } from 'src/models/bed-prices/dto/where.args'

@InputType()
export class LocationStatsWhereUniqueInput
  implements Required<Prisma.LocationStatsWhereUniqueInput>
{
  @Field(() => Number, { nullable: true })
  id: number
}

@InputType()
export class LocationStatsWhereInput
  implements Required<Prisma.LocationStatsWhereInput>
{
  @Field(() => StringFilter, { nullable: true })
  images: StringFilter
  @Field(() => StringFilter, { nullable: true })
  name: StringFilter
  @Field(() => IntFilter, { nullable: true })
  id: IntFilter
  @Field(() => IntFilter, { nullable: true })
  totalHomes: IntFilter
  @Field(() => FloatFilter, { nullable: true })
  lat: FloatFilter
  @Field(() => FloatFilter, { nullable: true })
  lng: FloatFilter
  @Field(() => IntFilter, { nullable: true })
  priceSqft: IntFilter
  @Field(() => LocationStatsType, { nullable: true })
  type: LocationStatsType
  @Field(() => BedPriceListRelationFilter, { nullable: true })
  bedsPrice: BedPriceListRelationFilter

  @Field(() => [LocationStatsWhereInput], { nullable: true })
  AND: LocationStatsWhereInput[]
  @Field(() => [LocationStatsWhereInput], { nullable: true })
  OR: LocationStatsWhereInput[]
  @Field(() => [LocationStatsWhereInput], { nullable: true })
  NOT: LocationStatsWhereInput[]
}

@InputType()
export class LocationStatsListRelationFilter {
  @Field(() => LocationStatsWhereInput)
  every?: LocationStatsWhereInput
  @Field(() => LocationStatsWhereInput)
  some?: LocationStatsWhereInput
  @Field(() => LocationStatsWhereInput)
  none?: LocationStatsWhereInput
}

@InputType()
export class LocationStatsRelationFilter {
  @Field(() => LocationStatsWhereInput)
  is?: LocationStatsWhereInput
  @Field(() => LocationStatsWhereInput)
  isNot?: LocationStatsWhereInput
}

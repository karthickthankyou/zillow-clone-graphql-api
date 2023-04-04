import { Field, InputType, OmitType, PickType } from '@nestjs/graphql'
import { LocationStats } from '../entities/location-stats.entity'
import { CreateBedPriceInput } from 'src/models/bed-prices/dto/create-bed-price.input'

@InputType()
export class CreateLocationStatsInput extends PickType(
  LocationStats,
  ['lat', 'lng', 'priceSqft', 'totalHomes', 'type', 'name'],
  InputType,
) {
  @Field(() => [CreateBedPriceInputWithoutLocationId])
  bedPrices: CreateBedPriceInputWithoutLocationId[]
}
@InputType()
export class CreateBedPriceInputWithoutLocationId extends OmitType(
  CreateBedPriceInput,
  ['locationStatsId'],
  InputType,
) {}

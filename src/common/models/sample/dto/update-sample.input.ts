import { CreateSampleInput } from './create-sample.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSampleInput extends PartialType(CreateSampleInput) {
  @Field(() => Int)
  id: number
}

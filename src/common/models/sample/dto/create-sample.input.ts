import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateSampleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}

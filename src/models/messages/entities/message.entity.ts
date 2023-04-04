import { Field, ObjectType } from '@nestjs/graphql'
import { Message as MessageType } from '@prisma/client'

@ObjectType()
export class Message implements MessageType {
  uid: string
  id: number
  createdAt: Date
  updatedAt: Date
  message: string
  propertyId: number
  // Todo fill all properties
}

@ObjectType()
export class GroupedMessages {
  @Field()
  propertyId: number

  @Field(() => [Message])
  messages: Message[]
}

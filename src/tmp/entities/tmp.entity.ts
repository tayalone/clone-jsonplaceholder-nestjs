import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Tmp {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}

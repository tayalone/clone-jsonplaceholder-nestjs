import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'

@ObjectType()
export class Album {
  @Field(() => Int, { description: 'Album Unique Id' })
  id: number

  @Field()
  title: string

  @Field()
  url: string

  @Field(() => Int, { description: 'Album Owner Id' })
  userId: number

  @Field(() => User, { description: 'Child Comment' })
  owner: User
}

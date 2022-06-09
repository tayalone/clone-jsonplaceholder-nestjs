import { Field, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@users/entities/user.entity'

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'Todo Unique Id' })
  id: number

  @Field()
  title: string

  @Field()
  completed: boolean

  @Field(() => Int, { description: 'Id of Post Owner' })
  userId: number

  @Field(() => User, { description: 'Child Comment' })
  owner: User
}

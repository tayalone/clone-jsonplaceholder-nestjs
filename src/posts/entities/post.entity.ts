import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'Post Unique Id' })
  id: number

  @Field(() => Int, { description: 'Id of Post Owner' })
  userId: number

  @Field()
  title: string

  @Field()
  body: string

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'Id of Post Owner',
  })
  deletedAt?: Date
}

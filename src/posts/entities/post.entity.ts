import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'
import { Comment } from '../../comments/entities/comment.entity'

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

  @Field(() => [Comment], { description: 'Child Comment', nullable: true })
  comments?: Comment[]

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'post deleted time',
  })
  deletedAt?: Date
}

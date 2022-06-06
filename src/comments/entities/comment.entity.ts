import { Field, Int, ObjectType, GraphQLISODateTime } from '@nestjs/graphql'

import { Post } from '../../posts/entities/post.entity'

@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'Comment Unique Id' })
  id: number

  @Field(() => Int, { description: `Parent's Post id` })
  postId: number

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  body: string

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: 'comment deleted time',
  })
  @Field(() => Post, { description: `Parent's Comment`, nullable: true })
  post?: Post

  deletedAt?: Date
}

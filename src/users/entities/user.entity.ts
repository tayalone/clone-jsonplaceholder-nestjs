import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Album } from '@albums/entities/album.entity'
import { Post } from '@posts/entities/post.entity'
import { Todo } from '@todos/entities/todo.entity'
import { Address } from './address.entity'
import { Company } from './company.entity'

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User Unique Id' })
  id: number

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  email: string

  @Field(() => Address, { description: 'User Address', nullable: true })
  address?: Address

  @Field()
  phone: string

  @Field()
  website: string

  @Field(() => Company, { description: 'User Company', nullable: true })
  company?: Company

  @Field(() => [Album], { description: 'Child Comment', nullable: true })
  albums?: Album[]

  @Field(() => [Post], { description: 'Child Comment', nullable: true })
  posts?: Post[]

  @Field(() => [Todo], { description: 'Child Comment', nullable: true })
  todos?: Todo[]
}

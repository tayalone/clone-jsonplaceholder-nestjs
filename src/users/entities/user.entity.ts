import { Field, ObjectType, Int } from '@nestjs/graphql'
import { Address } from './address.entity'
import { Company } from './company.entity'

@ObjectType()
export class User {
  @Field(() => Int, { description: 'User Unique Id' })
  id: string

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
}

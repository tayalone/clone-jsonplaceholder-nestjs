import { Field, ObjectType } from '@nestjs/graphql'
import { Geo } from './geo.entity'

@ObjectType()
export class Address {
  @Field()
  title: string

  @Field()
  suite: string

  @Field()
  zipcode: string

  @Field(() => Geo, { description: 'Child Comment', nullable: true })
  geo: Geo
}

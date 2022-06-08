import { Field, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Geo {
  @Field(() => Float, { description: 'Latitude Value' })
  lat: number

  @Field(() => Float, { description: 'Longtitude Value' })
  lng: number
}

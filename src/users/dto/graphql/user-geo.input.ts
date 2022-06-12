import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNumber, IsLatitude, IsLongitude } from 'class-validator'

@InputType()
export class UserGeoInput {
  @Field(() => Int, { description: 'Latitude' })
  @IsNumber()
  @IsLatitude()
  lat: number

  @Field(() => Int, { description: 'Longtitude' })
  @IsNumber()
  @IsLongitude()
  lng: number
}

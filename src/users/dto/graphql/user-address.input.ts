import { Field, InputType } from '@nestjs/graphql'
import { IsString, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UserGeoInput } from './user-geo.input'

@InputType()
export class UserAddressInput {
  @Field()
  @IsString()
  street: string

  @Field()
  @IsString()
  suite: string

  @Field()
  @IsString()
  zipcode: string

  @Field()
  @IsObject()
  @ValidateNested()
  @Type(() => UserGeoInput)
  geo: UserGeoInput
}

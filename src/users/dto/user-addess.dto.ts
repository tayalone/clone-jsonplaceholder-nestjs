import { IsString, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { UserGeoDto } from './user-geo.dto'

export class UserAddressDto {
  @IsString()
  street: string

  @IsString()
  suite: string

  @IsString()
  zipcode: string

  @IsObject()
  @ValidateNested()
  @Type(() => UserGeoDto)
  geo: UserGeoDto
}

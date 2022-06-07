import { IsNotEmpty, ValidateNested } from 'class-validator'
import { UserGeoDto } from './user-geo.dto'

export class UserAddressDto {
  @IsNotEmpty()
  street: string

  @IsNotEmpty()
  suite: string

  @IsNotEmpty()
  zipcode: string

  @ValidateNested()
  geo: UserGeoDto
}

import { IsNumber, IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator'

export class UserGeoDto {
  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  lat: number

  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  lng: number
}

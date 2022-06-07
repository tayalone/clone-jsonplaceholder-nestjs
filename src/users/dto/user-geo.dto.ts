import { IsNumber, IsLatitude, IsLongitude } from 'class-validator'

export class UserGeoDto {
  @IsNumber()
  @IsLatitude()
  lat: number

  @IsNumber()
  @IsLongitude()
  lng: number
}

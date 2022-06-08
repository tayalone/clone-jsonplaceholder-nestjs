import {
  IsUrl,
  MinLength,
  ValidateNested,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'
import { UserAddressDto } from './user-addess.dto'
import { UserCompayDto } from './user-compay.dto'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Name is too short',
  })
  name: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsString()
  @IsUrl()
  website: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserCompayDto)
  company: UserCompayDto
}

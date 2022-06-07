import {
  IsEmail,
  IsLowercase,
  IsUrl,
  MinLength,
  ValidateNested,
  IsString,
  IsObject,
} from 'class-validator'
import { Type } from 'class-transformer'
import { UserAddressDto } from './user-addess.dto'
import { UserCompayDto } from './user-compay.dto'

export class CreateUserDto {
  @IsString()
  @MinLength(5, {
    message: 'Name is too short',
  })
  name: string

  @IsString()
  @MinLength(4, {
    message: 'Username is too short',
  })
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  username: string

  @IsString()
  @IsEmail()
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  email: string

  @IsObject()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto

  @IsString()
  phone: string

  @IsString()
  @IsUrl()
  website: string

  @IsObject()
  @ValidateNested()
  @Type(() => UserCompayDto)
  company: UserCompayDto
}

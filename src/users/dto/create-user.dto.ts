import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { UserAddressDto } from './user-addess.dto'
import { UserCompayDto } from './user-compay.dto'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Name is too short',
  })
  name: string

  @IsNotEmpty()
  @MinLength(4, {
    message: 'Username is too short',
  })
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  username: string

  @IsNotEmpty()
  @IsEmail()
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  email: string

  @ValidateNested()
  addess: UserAddressDto

  @IsNotEmpty()
  phone: string

  @IsNotEmpty()
  @IsUrl()
  website: string

  @ValidateNested()
  compay: UserCompayDto
}

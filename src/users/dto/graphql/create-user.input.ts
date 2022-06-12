import {
  IsEmail,
  IsLowercase,
  IsUrl,
  MinLength,
  ValidateNested,
  IsString,
  IsObject,
} from 'class-validator'
import { InputType, Field } from '@nestjs/graphql'

import { Type } from 'class-transformer'
import { UserAddressInput } from './user-address.input'
import { UserCompayInput } from './user-company.input'

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(5, {
    message: 'Name is too short',
  })
  name: string

  @Field()
  @IsString()
  @MinLength(4, {
    message: 'Username is too short',
  })
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  username: string

  @Field()
  @IsString()
  @IsEmail()
  @IsLowercase({
    message: 'Username must be lowercase',
  })
  email: string

  @Field()
  @IsObject()
  @ValidateNested()
  @Type(() => UserAddressInput)
  address: UserAddressInput

  @Field()
  @IsString()
  phone: string

  @Field()
  @IsString()
  @IsUrl()
  website: string

  @Field()
  @IsObject()
  @ValidateNested()
  @Type(() => UserCompayInput)
  company: UserCompayInput
}

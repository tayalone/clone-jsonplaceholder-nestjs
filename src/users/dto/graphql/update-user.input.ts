import {
  IsUrl,
  MinLength,
  ValidateNested,
  IsString,
  IsObject,
  IsOptional,
} from 'class-validator'
import { Type } from 'class-transformer'
import { InputType, Field } from '@nestjs/graphql'
import { UserAddressInput } from './user-address.input'
import { UserCompayInput } from './user-company.input'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Name is too short',
  })
  name?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserAddressInput)
  address?: UserAddressInput

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserCompayInput)
  company?: UserCompayInput
}

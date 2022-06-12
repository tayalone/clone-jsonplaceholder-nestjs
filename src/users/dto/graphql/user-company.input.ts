import { InputType, Field } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class UserCompayInput {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsString()
  catchPhrase: string

  @Field()
  @IsString()
  bs: string
}

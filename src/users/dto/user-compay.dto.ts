import { IsString } from 'class-validator'

export class UserCompayDto {
  @IsString()
  name: string

  @IsString()
  catchPhrase: string

  @IsString()
  bs: string
}

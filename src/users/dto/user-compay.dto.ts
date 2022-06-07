import { IsNotEmpty } from 'class-validator'

export class UserCompayDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  catchPhrase: string

  @IsNotEmpty()
  bs: string
}

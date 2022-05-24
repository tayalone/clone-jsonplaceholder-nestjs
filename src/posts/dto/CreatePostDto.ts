import { IsNotEmpty, IsInt, MinLength } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsInt()
  userId: number

  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @IsNotEmpty()
  @MinLength(5, {
    message: 'Body is too short',
  })
  body: string
}

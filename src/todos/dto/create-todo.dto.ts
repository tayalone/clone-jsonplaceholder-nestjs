import { IsNotEmpty, IsInt, MinLength, IsBoolean } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  @IsInt()
  userId: number

  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @IsNotEmpty()
  @IsBoolean()
  completed: boolean
}

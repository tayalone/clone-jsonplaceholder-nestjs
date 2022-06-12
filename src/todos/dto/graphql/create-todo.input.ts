import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsInt, MinLength, IsBoolean } from 'class-validator'

@InputType()
export class CreateTodoInput {
  @Field(() => Int, { description: 'User Id' })
  @IsNotEmpty()
  @IsInt()
  userId: number

  @Field({ description: 'Todos Title' })
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @Field({ description: 'complete status' })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean
}

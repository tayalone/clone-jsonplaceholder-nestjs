import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsInt, MinLength } from 'class-validator'

@InputType()
export class CreateTmpInput {
  @Field(() => Int, { description: 'User Id' })
  @IsNotEmpty()
  @IsInt()
  userId: number

  @Field({ description: 'Post Title' })
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @Field({ description: 'Post Body' })
  @IsNotEmpty()
  @MinLength(10, {
    message: 'Body is too short',
  })
  body: string
}

import { InputType, Int, Field } from '@nestjs/graphql'
import { IsInt, MinLength, IsString, IsEmail } from 'class-validator'

@InputType()
export class CreateCommentInput {
  @Field(() => Int, { description: 'Post Id' })
  @IsInt()
  postId: number

  @IsString()
  @MinLength(5, {
    message: 'Body is too short',
  })
  body: string

  @IsString()
  name: string

  @IsString()
  @IsEmail()
  email: string
}

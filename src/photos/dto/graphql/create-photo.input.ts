import { InputType, Int, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsInt, MinLength, IsUrl, IsString } from 'class-validator'

@InputType()
export class CreatePhotoInput {
  @Field(() => Int, { description: 'Album Id' })
  @IsNotEmpty()
  @IsInt()
  albumId: number

  @Field({ description: 'Post Title' })
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @Field()
  @IsString()
  @IsUrl()
  url: string

  @Field()
  @IsString()
  @IsUrl()
  thumbnailUrl: string
}

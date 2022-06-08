import { IsInt, IsUrl, MinLength, IsString } from 'class-validator'

export class CreatePhotoDto {
  @IsInt()
  albumId: number

  @IsString()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string

  @IsString()
  @IsUrl()
  url: string

  @IsString()
  @IsUrl()
  thumbnailUrl: string
}

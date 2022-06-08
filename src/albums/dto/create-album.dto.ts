import { IsString, IsInt, MinLength } from 'class-validator'

export class CreateAlbumDto {
  @IsInt()
  userId: number

  @IsString()
  @MinLength(5, {
    message: 'Title is too short',
  })
  title: string
}

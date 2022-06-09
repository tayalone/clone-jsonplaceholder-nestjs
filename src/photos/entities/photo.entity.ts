import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Album } from '@albums/entities/album.entity'

@ObjectType()
export class Photo {
  @Field(() => Int, { description: 'Photo Unique Id' })
  id: number

  @Field(() => Int, { description: 'Id of Album' })
  albumId: number

  @Field()
  title: string

  @Field()
  url: string

  @Field()
  thumbnailUrl: string

  @Field(() => Album, { description: 'Child Comment' })
  album: Album
}

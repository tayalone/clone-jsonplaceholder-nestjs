import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { AlbumsService } from '@albums/albums.service'
import { Album } from '@albums/entities/album.entity'
import { UserService } from '@users/users.service'
import { Photo } from './entities/photo.entity'
import { PhotosService } from './photos.service'

@Resolver(() => Photo)
export class PhotoResolver {
  constructor(
    private readonly photoService: PhotosService,
    private readonly albumService: AlbumsService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Photo], { name: 'photos' })
  findAll(
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    return this.photoService.findAll({
      skip,
      take,
      where: where ? JSON.parse(where) : undefined,
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Query(() => Photo, { name: 'photo' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.photoService.findOne({ id })
  }

  @ResolveField('album', () => Album)
  async album(@Parent() photo: Photo) {
    const { albumId } = photo
    return this.albumService.findOne({ id: albumId })
  }
}

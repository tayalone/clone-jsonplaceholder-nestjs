import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PhotosService } from '@photos/photos.service'
import { UserService } from '@users/users.service'
import { User } from '@users/entities//user.entity'
import { Photo } from '@photos/entities/photo.entity'
import { Album } from './entities/album.entity'
import { AlbumsService } from './albums.service'

@Resolver(() => Album)
export class AlbumResolver {
  constructor(
    private readonly albumService: AlbumsService,
    private readonly photoService: PhotosService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Album], { name: 'albums' })
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
    return this.albumService.findAll({
      skip,
      take,
      where: where ? JSON.parse(where) : undefined,
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Query(() => Album, { name: 'album' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.albumService.findOne({ id })
  }

  @ResolveField('owner', () => User)
  async owner(@Parent() album: Album) {
    const { userId } = album
    return this.userService.findOne({ id: userId })
  }

  @ResolveField('photos', () => [Photo])
  async photos(@Parent() album: Album) {
    const { id } = album
    return this.photoService.findAll({ where: { albumId: id } })
  }
}

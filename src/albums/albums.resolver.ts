import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PhotosService } from '@photos/photos.service'
import { UserService } from '@users/users.service'
import { User } from '@users/entities//user.entity'
import { Photo } from '@photos/entities/photo.entity'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Album } from './entities/album.entity'
import { AlbumsService } from './albums.service'
import { CreateAlbumInput } from './dto/graphql/create-album.input'
import { UpdateAlbumInput } from './dto/graphql/update-album.input'

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
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
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
  async photos(
    @Parent() album: Album,
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    const { id } = album
    const tmpWhere = where ? JSON.parse(where) : {}

    return this.photoService.findAll({
      skip,
      take,
      where: { ...tmpWhere, albumId: id },
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Mutation(() => Album)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput) {
    return this.albumService.create({ ...createAlbumInput })
  }

  @Mutation(() => Album)
  updateAlbum(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput,
  ) {
    return this.albumService.update({
      where: { id },
      data: { ...updateAlbumInput },
    })
  }

  @Mutation(() => String)
  async deleteAlbum(@Args('id', { type: () => Int }) id: number) {
    const deletedResult = await this.albumService.remove({ id })
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}

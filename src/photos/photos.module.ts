import { Module } from '@nestjs/common'
import { AlbumsService } from '@albums/albums.service'
import { UserService } from '@users/users.service'
import { PhotosService } from './photos.service'
import { PhotosController } from './photos.controller'
import { PhotoResolver } from './photo.resolver'

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, AlbumsService, UserService, PhotoResolver],
})
export class PhotosModule {}

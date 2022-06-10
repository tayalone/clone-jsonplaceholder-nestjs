import { Module } from '@nestjs/common'
import { PhotosService } from '@photos/photos.service'
import { UserService } from '@users/users.service'
import { AlbumsService } from './albums.service'
import { AlbumsController } from './albums.controller'
import { AlbumResolver } from './albums.resolver'

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumResolver, PhotosService, UserService],
})
export class AlbumsModule {}

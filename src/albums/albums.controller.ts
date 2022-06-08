import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common'
import { Album } from '@prisma/client'
import { AlbumsService } from './albums.service'
import { CreateAlbumDto } from './dto/create-album.dto'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto)
  }

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll({})
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Album | any> {
    return this.albumsService.findOne({ id: +id })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update({
      where: { id: +id },
      data: updateAlbumDto,
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const deletedResult = await this.albumsService.remove({ id: +id })
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}

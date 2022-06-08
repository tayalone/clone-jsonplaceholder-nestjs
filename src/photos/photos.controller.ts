import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Photo } from '@prisma/client'
import { PhotosService } from './photos.service'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photosService.create(createPhotoDto)
  }

  @Get()
  findAll(): Promise<Photo[]> {
    return this.photosService.findAll({})
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Photo | any> {
    return this.photosService.findOne({ id: +id })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<Photo> {
    return this.photosService.update({
      where: { id: +id },
      data: updatePhotoDto,
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    const result = await this.photosService.remove({ id: +id })
    if (!result) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}

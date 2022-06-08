import { Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma/prisma.service'
import { Album, Prisma } from '@prisma/client'
import { UpdateAlbumDto } from './dto/update-album.dto'

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AlbumUncheckedCreateInput): Promise<Album> {
    return this.prisma.album.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AlbumWhereUniqueInput
    where?: Prisma.AlbumWhereInput
    orderBy?: Prisma.AlbumOrderByWithRelationInput
  }): Promise<Album[]> {
    return this.prisma.album.findMany({ ...params })
  }

  async findOne(where: Prisma.AlbumWhereUniqueInput): Promise<Album | any> {
    const result = await this.prisma.album.findUnique({ where })
    if (result) {
      return result
    }
    return {}
  }

  async update(params: {
    where: Prisma.AlbumWhereUniqueInput
    data: Prisma.AlbumUncheckedUpdateInput
  }): Promise<Album | any> {
    const result = await this.prisma.album.update({ ...params })
    if (result) {
      return result
    }
    return {}
  }

  async remove(where: Prisma.AlbumWhereUniqueInput): Promise<boolean> {
    try {
      await this.prisma.album.delete({ where })
      return true
    } catch (_) {
      return false
    }
  }
}

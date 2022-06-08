import { Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma/prisma.service'
import { Photo, Prisma } from '@prisma/client'

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo> {
    return this.prisma.photo.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.PhotoWhereUniqueInput
    where?: Prisma.PhotoWhereInput
    orderBy?: Prisma.PhotoOrderByWithRelationInput
  }): Promise<Photo[]> {
    return this.prisma.photo.findMany({ ...params })
  }

  async findOne(where: Prisma.PhotoWhereUniqueInput): Promise<Photo | any> {
    const result = await this.prisma.photo.findUnique({ where })
    if (result) {
      return result
    }
    return {}
  }

  async update(params: {
    where: Prisma.PhotoWhereUniqueInput
    data: Prisma.PhotoUncheckedUpdateInput
  }): Promise<Photo | any> {
    const result = await this.prisma.photo.update({ ...params })
    if (result) {
      return result
    }
    return {}
  }

  async remove(where: Prisma.PhotoWhereUniqueInput): Promise<boolean> {
    try {
      await this.prisma.photo.delete({ where })
      return true
    } catch (_) {
      return false
    }
    // return `This action removes a #${id} photo`
  }
}

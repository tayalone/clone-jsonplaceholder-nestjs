import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from '@services/prisma/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return this.prisma.user.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.UserWhereUniqueInput
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({ skip, take, cursor, where, orderBy })
  }

  async findOne(where: Prisma.UserWhereUniqueInput): Promise<User | any> {
    const result = await this.prisma.user.findUnique({ where })
    if (!result) {
      return {}
    }
    return result
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }
}

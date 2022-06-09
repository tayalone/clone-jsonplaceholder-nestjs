import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from '@services/prisma/prisma.service'

@Injectable()
export class UserService {
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

  async update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User | null> {
    const { where, data } = params
    const result = await this.prisma.user.update({ where, data })
    if (result) {
      return result
    }
    return null
  }
}

import { Injectable } from '@nestjs/common'
import { Todo, Prisma } from '@prisma/client'
import { PrismaService } from '@services/prisma/prisma.service'

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoUncheckedCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.TodoWhereUniqueInput
    where?: Prisma.TodoWhereInput
    orderBy?: Prisma.TodoOrderByWithRelationInput
  }): Promise<Todo[]> {
    return this.prisma.todo.findMany({ ...params })
  }

  async findOne(where: Prisma.TodoWhereUniqueInput): Promise<Todo | unknown> {
    const result = await this.prisma.todo.findUnique({ where })

    if (result) {
      return result
    }
    return {}
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput
    data: Prisma.TodoUncheckedUpdateInput
  }): Promise<Todo> {
    return this.prisma.todo.update({ where: params.where, data: params.data })
  }

  async remove(where: Prisma.TodoWhereUniqueInput): Promise<boolean> {
    try {
      await this.prisma.todo.delete({ where })
      return true
    } catch (_err) {
      return false
    }
  }
}

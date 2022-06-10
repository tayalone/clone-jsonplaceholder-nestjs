import { Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma/prisma.service'
import { Comment, Prisma } from '@prisma/client'
import { Comment as CommnentInterface } from './interfaces/comments.interfaces'
import { Include } from './interfaces/include.interfaces'

interface SelectInterface {
  postId: boolean
  id: boolean
  name: boolean
  email: boolean
  body: boolean
  post?: any
}

const SELECT_ATTRIBUTE = {
  id: true,
  postId: true,
  name: true,
  email: true,
  body: true,
}

const EXISITNG_COND = {
  deletedAt: {
    equals: null,
  },
}

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  private generateInclude({ includes = [] }: { includes: string[] }): Include {
    if (includes.length <= 0) {
      return undefined
    }
    const EXISTING_INCLUDE = ['post']
    const include = includes.reduce((acc, data) => {
      const match = EXISTING_INCLUDE.includes(data)
      if (!match) {
        return acc
      }
      return {
        ...acc,
        [data]: {
          select: {
            id: true,
            userId: true,
            body: true,
            title: true,
          },
        },
      }
    }, {})
    return include
  }

  findAll({
    postId,
    includes = [],
  }: {
    postId?: number
    includes?: string[]
  }): Promise<CommnentInterface[]> {
    const where: any = {}

    if (postId) {
      where.postId = postId
    }

    const include = this.generateInclude({ includes })

    const select: SelectInterface = {
      ...SELECT_ATTRIBUTE,
    }
    if (include) {
      if (include.post) {
        select.post = include.post
      }
    }

    return this.prisma.comment.findMany({
      select,
      where: { ...EXISITNG_COND, ...where },
    })
  }

  findAllComment(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CommentWhereUniqueInput
    where?: Prisma.CommentWhereInput
    orderBy?: Prisma.CommentOrderByWithRelationInput
  }): Promise<Comment[]> {
    return this.prisma.comment.findMany({ ...params })
  }

  findOne(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
    return this.prisma.comment.findUnique({ where })
  }

  async update(params: {
    where: Prisma.AlbumWhereUniqueInput
    data: Prisma.AlbumUncheckedUpdateInput
  }): Promise<Comment | any> {
    const result = await this.prisma.comment.update({ ...params })
    if (result) {
      return result
    }
    return {}
  }

  async remove(where: Prisma.AlbumWhereUniqueInput): Promise<boolean> {
    try {
      await this.prisma.comment.delete({ where })
      return true
    } catch (_) {
      return false
    }
  }

  async deleteCommentByPostId({ postId }: { postId: number }): Promise<number> {
    const countDeleteComment = await this.prisma.comment.deleteMany({
      where: {
        AND: [
          { postId },
          {
            deletedAt: {
              equals: null,
            },
          },
        ],
      },
    })
    return countDeleteComment.count
  }
}

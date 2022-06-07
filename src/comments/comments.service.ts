import { Injectable } from '@nestjs/common'
import { PrismaService } from '@services/prisma/prisma.service'
import { Comment } from './interfaces/comments.interfaces'
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
  }): Promise<Comment[]> {
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

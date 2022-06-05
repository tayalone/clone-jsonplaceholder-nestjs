import { Injectable } from '@nestjs/common'
import { Comment } from './interfaces/comments.interfaces'
import { PrismaService } from '../services/prisma/prisma.service'
import { Include } from './interfaces/include.interfaces'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  private generateInclude({ includes = [] }: { includes: string[] }): Include {
    if (includes.length <= 0) {
      return {}
    }
    const EXISTING_INCLUDE = ['post']
    const include = includes.reduce((acc, data) => {
      const match = EXISTING_INCLUDE.includes(data)
      if (!match) {
        return acc
      }
      return { ...acc, [data]: true }
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

    return this.prisma.comment.findMany({ where: { ...where }, include })
  }
}

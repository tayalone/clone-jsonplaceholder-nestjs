import { Injectable } from '@nestjs/common'
import { Comment } from './interfaces/comments.interfaces'
import { PrismaService } from '../services/prisma/prisma.service'

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

  findAll({ postId }: { postId?: number }): Promise<Comment[]> {
    const where: any = {}

    if (postId) {
      where.postId = postId
    }

    return this.prisma.comment.findMany({
      where: { ...where, ...EXISITNG_COND },
      select: { ...SELECT_ATTRIBUTE },
    })
  }

  async deleteCommentByPostId({ postId }: { postId: number }): Promise<number> {
    const countDeleteComment = await this.prisma.comment.deleteMany({
      where: {
        AND: [
          { postId },
          {
            ...EXISITNG_COND,
          },
        ],
      },
    })
    return countDeleteComment.count
  }
}

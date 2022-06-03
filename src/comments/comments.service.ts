import { Injectable } from '@nestjs/common'
import { Comment } from './interfaces/comments.interfaces'
import { PrismaService } from '../services/prisma/prisma.service'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  findAll({ postId }: { postId?: number }): Promise<Comment[]> {
    const where: any = {}

    if (postId) {
      where.postId = postId
    }

    return this.prisma.comment.findMany({ where: { ...where } })
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

import { Injectable } from '@nestjs/common'
import { COMMENTS } from '../mock/comments'
import { Comment } from './interfaces/comments.interfaces'
import { PrismaService } from '../services/prisma/prisma.service'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  private readonly comments: Comment[] = COMMENTS

  findAll({ postId }: { postId?: number }): Comment[] {
    // const where: any = {}

    // if (postId) {
    //   where.postId = postId
    // }

    const comments = this.comments.filter((c) => {
      return true && postId ? c.postId === postId : true
    })
    return comments
  }
}

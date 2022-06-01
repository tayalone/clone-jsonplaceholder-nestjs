import { Injectable } from '@nestjs/common'
import { COMMENTS } from '../mock/comments'
import { Comment } from './interfaces/comments.interfaces'

@Injectable()
export class CommentsService {
  private readonly comments: Comment[] = COMMENTS

  findAll({ postId }: { postId?: number }): Comment[] {
    const comments = this.comments.filter((c) => {
      return true && postId ? c.postId === postId : true
    })
    return comments
  }
}

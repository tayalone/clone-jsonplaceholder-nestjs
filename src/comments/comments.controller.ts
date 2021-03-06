import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  Query,
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { Comment } from './interfaces/comments.interfaces'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAllComment(
    @Query('postId') postId?: number,
    @Query(
      'includes',
      new DefaultValuePipe([]),
      new ParseArrayPipe({ items: String, separator: ',' }),
    )
    includes?: string[],
  ): Promise<Comment[]> {
    const queryOptions: any = {}
    if (postId) {
      queryOptions.postId = postId
    }
    return this.commentsService.findAll({ ...queryOptions, includes })
  }
}

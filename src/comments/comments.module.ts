import { Module } from '@nestjs/common'
import { PostsService } from '@posts/posts.service'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { CommentResolver } from './comments.resolver'

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentResolver, PostsService],
  exports: [CommentsService],
})
export class CommentsModule {}

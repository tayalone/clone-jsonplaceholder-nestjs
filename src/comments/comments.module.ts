import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { CommentResolver } from './comments.resolver'
import { PostsService } from '../posts/posts.service'

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentResolver, PostsService],
  exports: [CommentsService],
})
export class CommentsModule {}

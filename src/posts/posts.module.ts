import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { CommentsService } from '../comments/comments.service'
import { PostResolver } from './post.resolver'

@Module({
  controllers: [PostsController],
  providers: [PostsService, CommentsService, PostResolver],
})
export class PostsModule {}

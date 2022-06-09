import { Module } from '@nestjs/common'
import { CommentsService } from '@comments/comments.service'
import { UsersService } from '@users/users.service'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'
import { PostResolver } from './post.resolver'

@Module({
  controllers: [PostsController],
  providers: [PostsService, CommentsService, PostResolver, UsersService],
  exports: [PostsService],
})
export class PostsModule {}

import { Module } from '@nestjs/common'
import { AlbumsService } from '@albums/albums.service'
import { PostsService } from '@posts/posts.service'
import { TodosService } from '@todos/todos.service'
import { CommentsService } from '@comments/comments.service'
import { UsersController } from './users.controller'
import { UserService } from './users.service'
import { UserResolver } from './users.resolver'

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    UserResolver,
    AlbumsService,
    PostsService,
    TodosService,
    CommentsService,
  ],
})
export class UsersModule {}

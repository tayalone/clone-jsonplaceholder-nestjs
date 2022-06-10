import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AlbumsService } from '@albums/albums.service'
import { Album } from '@albums/entities/album.entity'
import { PostsService } from '@posts/posts.service'
import { Post } from '@posts/entities/post.entity'
import { TodosService } from '@todos/todos.service'
import { Todo } from '@todos/entities/todo.entity'
import { UserService } from './users.service'
import { User } from './entities/user.entity'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly albumsService: AlbumsService,
    private readonly postService: PostsService,
    private readonly todoService: TodosService,
  ) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    return this.userService.findAll({
      skip,
      take,
      where: where ? JSON.parse(where) : undefined,
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Query(() => User, { name: 'user' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne({ id })
  }

  @ResolveField('albums', () => [Album])
  async albums(@Parent() user: User) {
    const { id } = user
    return this.albumsService.findAll({ where: { userId: id } })
  }

  @ResolveField('posts', () => [Post])
  async posts(@Parent() user: User) {
    const { id } = user
    return this.postService.findAllPosts({ where: { userId: id } })
  }

  @ResolveField('todos', () => [Todo])
  async todos(@Parent() user: User) {
    const { id } = user
    return this.todoService.findAll({ where: { userId: id } })
  }
}

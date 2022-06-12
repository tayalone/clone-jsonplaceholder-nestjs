import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql'
import { AlbumsService } from '@albums/albums.service'
import { Album } from '@albums/entities/album.entity'
import { PostsService } from '@posts/posts.service'
import { Post } from '@posts/entities/post.entity'
import { TodosService } from '@todos/todos.service'
import { Todo } from '@todos/entities/todo.entity'
import { instanceToPlain } from 'class-transformer'
import { UserService } from './users.service'
import { User } from './entities/user.entity'

import { CreateUserInput } from './dto/graphql/create-user.input'
import { UpdateUserInput } from './dto/graphql/update-user.input'

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
  async albums(
    @Parent() user: User,
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    const { id } = user
    const tmpWhere = where ? JSON.parse(where) : {}

    return this.albumsService.findAll({
      skip,
      take,
      where: { ...tmpWhere, userId: id },
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @ResolveField('posts', () => [Post])
  async posts(
    @Parent() user: User,
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    const { id } = user
    const tmpWhere = where ? JSON.parse(where) : {}
    return this.postService.findAllPosts({
      skip,
      take,
      where: { ...tmpWhere, userId: id },
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @ResolveField('todos', () => [Todo])
  async todos(
    @Parent() user: User,
    @Args('skip', { type: () => Int, defaultValue: undefined, nullable: true })
    skip: number,
    @Args('take', { type: () => Int, defaultValue: undefined, nullable: true })
    take: number,
    @Args('where', { defaultValue: undefined, nullable: true })
    where: string,
    @Args('orderBy', { defaultValue: undefined, nullable: true })
    orderBy: string,
  ) {
    const { id } = user
    const tmpWhere = where ? JSON.parse(where) : {}
    return this.todoService.findAll({
      skip,
      take,
      where: { ...tmpWhere, userId: id },
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const data = {
      ...createUserInput,
      address: instanceToPlain(createUserInput.address),
      company: instanceToPlain(createUserInput.company),
    }
    return this.userService.create(data)
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const data = {
      ...updateUserInput,
      address: updateUserInput.address
        ? instanceToPlain(updateUserInput.address)
        : undefined,
      company: updateUserInput.company
        ? instanceToPlain(updateUserInput.company)
        : undefined,
    }

    return this.userService.update({
      where: { id },
      data,
    })
  }
}

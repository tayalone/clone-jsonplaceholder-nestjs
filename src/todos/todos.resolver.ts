import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { UsersService } from '@users/users.service'
import { User } from '@users/entities/user.entity'
import { Todo } from './entities/todo.entity'
import { TodosService } from './todos.service'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodosService,
    private readonly userService: UsersService,
  ) {}

  @Query(() => [Todo], { name: 'todos' })
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
    return this.todoService.findAll({
      skip,
      take,
      where: where ? JSON.parse(where) : undefined,
      orderBy: where ? JSON.parse(orderBy) : undefined,
    })
  }

  @Query(() => Todo, { name: 'todo' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne({ id })
  }

  @ResolveField('owner', () => User)
  async owner(@Parent() todo: Todo) {
    const { userId } = todo
    return this.userService.findOne({ id: userId })
  }
}

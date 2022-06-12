import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { UserService } from '@users/users.service'
import { User } from '@users/entities/user.entity'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Todo } from './entities/todo.entity'
import { TodosService } from './todos.service'
import { CreateTodoInput } from './dto/graphql/create-todo.input'
import { UpdateTodoInput } from './dto/graphql/update-todo.input'

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    private readonly todoService: TodosService,
    private readonly userService: UserService,
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

  @Mutation(() => Todo)
  createTodos(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create({ ...createTodoInput })
  }

  @Mutation(() => Todo)
  updateTodos(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update({ where: { id }, data: updateTodoInput })
  }

  @Mutation(() => String)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    const deletedResult = await this.todoService.remove({ id })
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}

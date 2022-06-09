import { Module } from '@nestjs/common'
import { UsersService } from '@users/users.service'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { TodoResolver } from './todos.resolver'

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodoResolver, UsersService],
})
export class TodosModule {}

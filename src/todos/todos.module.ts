import { Module } from '@nestjs/common'
import { UserService } from '@users/users.service'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { TodoResolver } from './todos.resolver'

@Module({
  controllers: [TodosController],
  providers: [TodosService, TodoResolver, UserService],
})
export class TodosModule {}

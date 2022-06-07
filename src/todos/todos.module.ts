import { Module } from '@nestjs/common'
import { PrismaService } from '@services/prisma/prisma.service'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule {}

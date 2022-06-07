import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Todo } from '@prisma/client'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto)
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll({})
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo | unknown> {
    return this.todosService.findOne({ id: +id })
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo | unknown> {
    return this.todosService.update({ where: { id: +id }, data: updateTodoDto })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedResult = await this.todosService.remove({ id: +id })
    if (!deletedResult) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }
    return `deleted`
  }
}

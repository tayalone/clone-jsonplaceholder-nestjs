import { OmitType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'

export class UpdateTodoDto extends OmitType(CreateTodoDto, [
  'userId',
] as const) {}

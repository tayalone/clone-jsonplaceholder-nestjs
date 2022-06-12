import { InputType, OmitType } from '@nestjs/graphql'
import { CreateTodoInput } from './create-todo.input'

@InputType()
export class UpdateTodoInput extends OmitType(CreateTodoInput, [
  'userId',
] as const) {}

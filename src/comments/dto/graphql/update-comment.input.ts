import { InputType, OmitType } from '@nestjs/graphql'
import { CreateCommentInput } from './create-comment.input'

@InputType()
export class UpdateCommentInput extends OmitType(CreateCommentInput, [
  'postId',
] as const) {}

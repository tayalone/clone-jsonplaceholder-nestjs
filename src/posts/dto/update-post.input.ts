import { InputType, OmitType } from '@nestjs/graphql'
import { CreatePostInput } from './create-post.input'

@InputType()
export class UpdatePostInput extends OmitType(CreatePostInput, [
  'userId',
] as const) {}

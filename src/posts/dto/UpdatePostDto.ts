import { OmitType } from '@nestjs/mapped-types'
import { CreatePostDto } from './CreatePostDto'

export class UpdatePostDto extends OmitType(CreatePostDto, [
  'userId' as const,
]) {}

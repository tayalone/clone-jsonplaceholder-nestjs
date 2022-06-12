import { InputType, OmitType } from '@nestjs/graphql'
import { CreatePhotoInput } from './create-photo.input'

@InputType()
export class UpdatePhotoInput extends OmitType(CreatePhotoInput, [
  'albumId',
] as const) {}

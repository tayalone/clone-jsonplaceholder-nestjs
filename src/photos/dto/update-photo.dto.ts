import { OmitType } from '@nestjs/mapped-types'
import { CreatePhotoDto } from './create-photo.dto'

export class UpdatePhotoDto extends OmitType(CreatePhotoDto, [
  'albumId',
] as const) {}

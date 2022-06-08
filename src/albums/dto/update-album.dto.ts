import { OmitType } from '@nestjs/mapped-types'
import { CreateAlbumDto } from './create-album.dto'

export class UpdateAlbumDto extends OmitType(CreateAlbumDto, [
  'userId',
] as const) {}

import { InputType, OmitType } from '@nestjs/graphql'
import { CreateAlbumInput } from './create-album.input'

@InputType()
export class UpdateAlbumInput extends OmitType(CreateAlbumInput, [
  'userId',
] as const) {}

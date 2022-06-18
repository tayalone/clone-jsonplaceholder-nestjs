import { PartialType } from '@nestjs/mapped-types';
import { CreateMaxotyDto } from './create-maxoty.dto';

export class UpdateMaxotyDto extends PartialType(CreateMaxotyDto) {}

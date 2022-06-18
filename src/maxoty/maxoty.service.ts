import { Injectable } from '@nestjs/common';
import { CreateMaxotyDto } from './dto/create-maxoty.dto';
import { UpdateMaxotyDto } from './dto/update-maxoty.dto';

@Injectable()
export class MaxotyService {
  create(createMaxotyDto: CreateMaxotyDto) {
    return 'This action adds a new maxoty';
  }

  findAll() {
    return `This action returns all maxoty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maxoty`;
  }

  update(id: number, updateMaxotyDto: UpdateMaxotyDto) {
    return `This action updates a #${id} maxoty`;
  }

  remove(id: number) {
    return `This action removes a #${id} maxoty`;
  }
}

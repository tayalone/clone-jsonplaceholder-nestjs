import { Injectable } from '@nestjs/common';
import { CreateTmpInput } from './dto/create-tmp.input';
import { UpdateTmpInput } from './dto/update-tmp.input';

@Injectable()
export class TmpService {
  create(createTmpInput: CreateTmpInput) {
    return 'This action adds a new tmp';
  }

  findAll() {
    return `This action returns all tmp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tmp`;
  }

  update(id: number, updateTmpInput: UpdateTmpInput) {
    return `This action updates a #${id} tmp`;
  }

  remove(id: number) {
    return `This action removes a #${id} tmp`;
  }
}

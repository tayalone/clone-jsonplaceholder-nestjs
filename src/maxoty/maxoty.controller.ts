import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MaxotyService } from './maxoty.service'
import { CreateMaxotyDto } from './dto/create-maxoty.dto'
import { UpdateMaxotyDto } from './dto/update-maxoty.dto'

@Controller('maxoty')
export class MaxotyController {
  constructor(private readonly maxotyService: MaxotyService) {}

  @Post()
  create(@Body() createMaxotyDto: CreateMaxotyDto) {
    return this.maxotyService.create(createMaxotyDto)
  }

  @Get()
  findAll() {
    return this.maxotyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maxotyService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaxotyDto: UpdateMaxotyDto) {
    return this.maxotyService.update(+id, updateMaxotyDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maxotyService.remove(+id)
  }
}

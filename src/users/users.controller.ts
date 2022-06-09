import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { instanceToPlain } from 'class-transformer'
import { UserService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const data = {
      ...createUserDto,
      address: instanceToPlain(createUserDto.address),
      company: instanceToPlain(createUserDto.company),
    }
    return this.usersService.create(data)
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll({})
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | any> {
    return this.usersService.findOne({ id: +id })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const data = {
      ...updateUserDto,
      address: updateUserDto.address
        ? instanceToPlain(updateUserDto.address)
        : undefined,
      company: updateUserDto.company
        ? instanceToPlain(updateUserDto.company)
        : undefined,
    }

    const user = await this.usersService.update({
      where: { id: +id },
      data,
    })

    if (!user) {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND)
    }

    return user
  }
}

import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import { User } from '@prisma/client'
import { instanceToPlain } from 'class-transformer'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UpdateUserDto {
    return updateUserDto
  }
}

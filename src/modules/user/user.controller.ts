import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户管理')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly UserStrvice: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.UserStrvice.create(createUserDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.UserStrvice.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserStrvice.findOne({ id: +id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.UserStrvice.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserStrvice.remove(+id);
  }
}

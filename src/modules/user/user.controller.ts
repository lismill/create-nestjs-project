import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'id', required: true, type: 'string' })
  findOneById(@Param() param: { id: string }) {
    return this.usersService.findOneById(param);
  }

  @Post()
  create() {
    return this.usersService.create();
  }

  @Put()
  update() {
    return this.usersService.update();
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'id', required: true, type: 'string' })
  remove(@Param() param: { id: string }) {
    return this.usersService.remove(param);
  }
}

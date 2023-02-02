import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
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
  remove(@Param() param: { id: string }) {
    return this.usersService.remove(param);
  }
}

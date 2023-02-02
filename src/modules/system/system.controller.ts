import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Get()
  findAll() {
    return this.systemService.findAll();
  }

  @Get(':id')
  findOneById(@Param() param: { id: string }) {
    return this.systemService.findOneById(param);
  }

  @Post()
  create() {
    return this.systemService.create();
  }

  @Put()
  update() {
    return this.systemService.update();
  }

  @Delete(':id')
  remove(@Param() param: { id: string }) {
    return this.systemService.remove(param);
  }
}

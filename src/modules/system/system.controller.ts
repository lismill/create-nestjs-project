import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('系统设置')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}
  @Get()
  findAll() {
    return this.systemService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'id', required: true, type: 'string' })
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
  @ApiParam({ name: 'id', description: 'id', required: true, type: 'string' })
  remove(@Param() param: { id: string }) {
    return this.systemService.remove(param);
  }
}

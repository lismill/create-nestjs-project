import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.roleService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return this.roleService.update(+id, roleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}

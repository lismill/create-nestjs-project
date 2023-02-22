import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ description: '权限名称', example: '' })
  name: string;

  @ApiProperty({ description: '权限节点', example: '' })
  nodes: string;
}

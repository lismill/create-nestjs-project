import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
export class RegistryUserDto extends PartialType(LoginUserDto) {
  @ApiPropertyOptional({ description: '昵称', example: '' })
  nickname?: string;

  @ApiPropertyOptional({ description: '头像', example: '' })
  image?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码', example: '' })
  password: string;

  @ApiProperty({ description: '年龄', example: '' })
  age?: number;

  @ApiProperty({ description: '城市', example: '' })
  city?: string;
}

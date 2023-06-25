import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({ minLength: 8, maxLength: 16, description: '用户名', example: '' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: '手机号', example: '' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: '密码', example: '' })
  @IsNotEmpty()
  password: string;
}

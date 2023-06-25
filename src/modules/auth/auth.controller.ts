import { Controller, Body, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorator/public';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('鉴权认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  /**
   * 登录
   * @param createUserDto 用户信息
   * @returns
   */
  @ApiOperation({ summary: '登录' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  /**
   * 注册
   * @param createUserDto 注册信息
   * @returns
   */
  @ApiOperation({ summary: '注册' })
  @Public()
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 校验 token
   * @param req 用户信息
   * @returns
   */
  @ApiOperation({ summary: '校验 Token' })
  @Get('/check')
  async getProfile(@Request() req: any) {
    return await this.userService.findOne({
      username: req.user.username,
    });
  }
}

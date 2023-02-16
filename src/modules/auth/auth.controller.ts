import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorator/public';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * 登录
   * @param req 用户信息
   * @returns
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() req: any) {
    return this.authService.login(req);
  }

  /**
   * 注册
   * @param req 注册信息
   * @returns
   */
  @Public()
  @Post('/register')
  async register(@Body() req: any) {
    return this.userService.create(req);
  }

  /**
   * 校验 token
   * @param req 用户信息
   * @returns
   */
  @Get('/check')
  async getProfile(@Request() req: any) {
    return await this.userService.findOne({
      username: req.user.username,
    });
  }
}

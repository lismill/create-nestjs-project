import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
   * 校验 token
   * @param req 用户信息
   * @returns
   */
  @Get('/check')
  getProfile(@Request() req: any) {
    return req.user;
  }
}

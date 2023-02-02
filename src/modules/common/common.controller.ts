import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('公共模块')
@Controller('')
export class CommonController {
  @Get('login')
  login() {
    return '/login';
  }

  @Get('logout')
  logout() {
    return '/logout';
  }
}

import { Controller, Get } from '@nestjs/common';

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

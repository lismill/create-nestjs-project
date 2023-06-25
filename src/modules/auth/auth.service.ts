import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Decrypt } from '../../utils/crypto';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * 校验用户
   * @param username 用户名
   * @param password 密码
   * @returns
   */
  async validateUser(username: string, password: string): Promise<any> {
    const result = await this.userService.findPasswordByName({ username });
    if (!result) return null;
    return Decrypt(result?.password) === password ? result : null;
  }

  /**
   * 登录
   * @param user 用户信息
   * @returns
   */
  async login(user: any): Promise<any> {
    const access_token = this.jwtService.sign(user);
    const result = await this.userService.findPasswordByName({
      username: user.username,
    });
    delete result.password;
    return { ...result, access_token: `Bearer ${access_token}` };
  }
}

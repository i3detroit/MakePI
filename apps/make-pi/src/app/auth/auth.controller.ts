import { AuthService, Auth, AuthReturn } from '@make-pi/shared/auth';
import { User } from '@make-pi/shared/database';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: Auth): Promise<AuthReturn> {
    return await this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: User): Promise<AuthReturn> {
    return await this.authService.register(body);
  }
}

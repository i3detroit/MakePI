import {
  AuthService,
  LoginUserDto,
  AuthReturn,
  RegisterUserDto,
} from '@make-pi/shared/auth';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() body: LoginUserDto): Promise<AuthReturn> {
    return this.authService.login(body);
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  register(@Body() body: RegisterUserDto): Promise<AuthReturn> {
    return this.authService.register(body);
  }
}

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
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginUserDto): Promise<AuthReturn> {
    try {
      return await this.authService.login(body);
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException({ message: [`Invalid Login`] });
    }
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterUserDto): Promise<AuthReturn> {
    try {
      return await this.authService.register(body);
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new BadRequestException({
            message: [`Duplicate entry for ${body.email}`],
          });
        default:
          throw new BadRequestException(err);
      }
    }
  }
}

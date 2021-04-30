import {
  AuthService,
  LoginUserDto,
  AuthReturn,
  RegisterUserDto,
  FailedLoginReasons,
  failedLoginMessages,
  AuthGuard,
  RecoveryCodeDto,
  ChangePasswordDto,
  ResetPasswordDto,
} from '@make-pi/shared/auth';
import {
  Controller,
  Request,
  Post,
  Body,
  Put,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
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
      switch (err.message) {
        case FailedLoginReasons.ACCOUNT_LOCKED:
          throw new UnauthorizedException({
            message: [failedLoginMessages[FailedLoginReasons.ACCOUNT_LOCKED]],
          });
        default:
          throw new UnauthorizedException({ message: ['Invalid Login'] });
      }
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

  @Put('/password')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Request() request
  ): Promise<void> {
    try {
      await this.authService.changePassword(
        request.user.sub,
        body.password,
        body.newPassword
      );
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  @Post('/recover-code')
  @UsePipes(new ValidationPipe())
  async recoverCode(@Body() body: RecoveryCodeDto): Promise<void> {
    try {
      const recoverCode = await this.authService.recoverCode(body.email);
      console.log({ recoverCode }); // TODO: Send in email
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  @Post('/recover-reset')
  @UsePipes(new ValidationPipe())
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    try {
      await this.authService.resetPassword(
        body.email,
        body.recoverCode,
        body.newPassword
      );
    } catch (err) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }
}

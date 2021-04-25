import { UsersService } from '@make-pi/models/users';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthDto, AuthReturn, FailedLoginReasons } from './auth.interface';

const EXPIRY = 86400;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService
  ) {}

  async login(data: AuthDto): Promise<AuthReturn> {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);
    const isMatch = await this.bcryptService.compare(
      data.password,
      user.password
    );
    if (!isMatch) throw new Error(FailedLoginReasons.PASSWORD_INCORRECT);
    const token = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: EXPIRY }
    );
    return { token };
  }
}

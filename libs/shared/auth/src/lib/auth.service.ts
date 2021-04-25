import { UsersService } from '@make-pi/models/users';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthDto, AuthReturn, FailedLoginReasons } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@make-pi/shared/database';

const EXPIRY = 86400;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async login(data: AuthDto): Promise<AuthReturn> {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);

    const isMatch = await this.bcryptService.compare(
      data.password,
      user.password
    );
    if (!isMatch) throw new Error(FailedLoginReasons.PASSWORD_INCORRECT);

    let token;
    if (data.remember) {
      token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });
    } else {
      token = this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
        },
        { expiresIn: EXPIRY }
      );
    }

    return { token };
  }

  async register(data: User): Promise<AuthReturn> {
    await this.usersService.create(data);

    const token = this.jwtService.sign(
      {
        sub: data.id,
        email: data.email.toLowerCase(),
      },
      { expiresIn: EXPIRY }
    );
    return { token };
  }
}

import { UsersService } from '@make-pi/models/users';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { Injectable } from '@nestjs/common';
import {
  Login,
  Register,
  AuthReturn,
  FailedLoginReasons,
} from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService
  ) {}

  async login(data: Login): Promise<AuthReturn> {
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
        { expiresIn: Number(process.env.JWT_EXPIRY) || 86400 }
      );
    }

    return { token };
  }

  async register(data: Register): Promise<AuthReturn> {
    const user = await this.usersService.create(data);
    const token = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: Number(process.env.JWT_EXPIRY) || 86400 }
    );
    return { token };
  }
}

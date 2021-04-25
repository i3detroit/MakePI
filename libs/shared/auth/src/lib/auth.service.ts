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
import * as moment from 'moment-timezone';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  jwtExpiry = this.configService.get<number>('JWT_EXPIRY', 86400);

  constructor(
    private usersService: UsersService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(data: Login): Promise<AuthReturn> {
    const user = await this.usersService.findOneByEmail(data.email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);

    if (user.lockUntil && moment(user.lockUntil).isAfter(moment())) {
      throw new Error(FailedLoginReasons.ACCOUNT_LOCKED);
    }

    const isMatch = await this.bcryptService.compare(
      data.password,
      user.password
    );
    if (!isMatch) {
      await this.usersService.increaseLoginAttempts(user.id);
      throw new Error(FailedLoginReasons.PASSWORD_INCORRECT);
    }

    await this.usersService.resetLoginAttempts(user.id);

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
        { expiresIn: this.jwtExpiry }
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
      { expiresIn: this.jwtExpiry }
    );
    return { token };
  }
}

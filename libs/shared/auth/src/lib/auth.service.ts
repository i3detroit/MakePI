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
  private jwtExpiry = this.configService.get<number>('JWT_EXPIRY', 86400);
  private maxLoginAttempts = this.configService.get<number>(
    'MAX_LOGIN_ATTEMPTS',
    10
  );
  private lockTime = this.configService.get<number>('LOCK_TIME', 60);

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
      await this.increaseLoginAttempts(user.id);
      throw new Error(FailedLoginReasons.PASSWORD_INCORRECT);
    }

    await this.resetLoginAttempts(user.id);

    let token: string;
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
    const token: string = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      { expiresIn: this.jwtExpiry }
    );
    return { token };
  }

  async increaseLoginAttempts(id: string): Promise<void> {
    const user = await this.usersService.findOneById(id);

    if (user.lockUntil && moment(user.lockUntil).isBefore(moment())) {
      const payload = { loginAttempts: 1, lockUntil: null };
      await this.usersService.update(id, payload);
      return;
    }

    const payload = {
      loginAttempts: user.loginAttempts + 1,
      lockUntil: null,
    };

    if (payload.loginAttempts >= this.maxLoginAttempts) {
      payload.lockUntil = moment().add(this.lockTime, 'seconds').toISOString();
    }

    await this.usersService.update(id, payload);
  }

  async resetLoginAttempts(id: string): Promise<void> {
    await this.usersService.update(id, { loginAttempts: 0, lockUntil: null });
  }

  async changePassword(id: string, password: string, newPassword: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);

    const isMatch = await this.bcryptService.compare(password, user.password);
    if (!isMatch) {
      throw new Error(FailedLoginReasons.PASSWORD_INCORRECT);
    }

    await this.usersService.update(id, { password: newPassword });
  }

  async recoverCode(email: string): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);

    const recoverCode = this._random(36);
    await this.usersService.update(user.id, { recoverCode });
    return recoverCode;
  }

  async resetPassword(email: string, recoverCode: string, newPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);

    if (user.recoverCode !== recoverCode) {
      throw new Error(FailedLoginReasons.INVALID_RECOVERY_CODE);
    }

    await this.usersService.update(user.id, {
      password: newPassword,
      recoverCode: null,
    });
  }

  private _random(length) {
    const result = [];
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join('');
  }
}

import { UsersService } from '@make-pi/models/users';
import { Injectable } from '@nestjs/common';
import { AuthDto, AuthReturn, FailedLoginReasons } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(data: AuthDto): Promise<AuthReturn> {
    const user = this.usersService.findOneByEmail(data.email);
    if (!user) throw new Error(FailedLoginReasons.NOT_FOUND);
  }
}

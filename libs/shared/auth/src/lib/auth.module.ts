import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@make-pi/models/users';
import { BcryptModule } from '@make-pi/shared/bcrypt';

@Module({
  imports: [UsersModule, BcryptModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

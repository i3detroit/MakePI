import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@make-pi/models/users';
import { BcryptModule } from '@make-pi/shared/bcrypt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    BcryptModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hard!to-guess_secret',
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

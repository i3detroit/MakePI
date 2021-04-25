import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@make-pi/models/users';
import { BcryptModule } from '@make-pi/shared/bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    BcryptModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hard!to-guess_secret',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@make-pi/models/users';
import { BcryptModule } from '@make-pi/shared/bcrypt';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hard!to-guess_secret',
    }),
    UsersModule,
    BcryptModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}

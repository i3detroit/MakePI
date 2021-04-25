import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@make-pi/models/users';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

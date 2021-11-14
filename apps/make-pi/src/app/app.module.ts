import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';
import { UserController } from './admin/user/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthController, UserController],
})
export class AppModule {}

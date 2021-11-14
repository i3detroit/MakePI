import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';
import { UserController } from './admin/user/user.controller';
import { AccessControlModule } from 'nest-access-control';

import { roles } from '@make-pi/roles';

@Module({
  imports: [AuthModule, AccessControlModule.forRoles(roles)],
  controllers: [AuthController, UserController],
})
export class AppModule {}

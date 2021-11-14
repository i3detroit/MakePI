import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';
import { UserController } from './admin/user/user.controller';
import { AccessControlModule } from 'nest-access-control';

import { roles } from '@make-pi/roles';
import { UsersModule } from '@make-pi/models/users';

@Module({
  imports: [AuthModule, UsersModule, AccessControlModule.forRoles(roles)],
  controllers: [AuthController, UserController],
})
export class AppModule {}

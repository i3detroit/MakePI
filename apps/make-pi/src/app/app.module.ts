import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';
import { UserController } from './admin/user/user.controller';
import { AccessControlModule } from 'nest-access-control';

import { roles } from '@make-pi/roles';
import { AccessModule } from '@make-pi/shared/access';

@Module({
  imports: [AuthModule, AccessModule, AccessControlModule.forRoles(roles)],
  controllers: [AuthController, UserController],
})
export class AppModule {}

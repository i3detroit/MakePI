import { Module } from '@nestjs/common';

import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
})
export class AppModule {}

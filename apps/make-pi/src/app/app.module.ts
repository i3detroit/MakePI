import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from '@make-pi/shared/auth';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

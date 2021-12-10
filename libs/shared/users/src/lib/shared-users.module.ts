import { Module } from '@nestjs/common';
import { SharedUsersService } from './shared-users.service';

@Module({
  controllers: [],
  providers: [SharedUsersService],
  exports: [SharedUsersService],
})
export class SharedUsersModule {}

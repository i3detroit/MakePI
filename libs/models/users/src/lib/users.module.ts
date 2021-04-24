import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

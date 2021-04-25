import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { BcryptModule } from '@make-pi/shared/bcrypt';

@Module({
  imports: [DatabaseModule, BcryptModule],
  controllers: [],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

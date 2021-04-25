import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { userProviders } from './users.providers';
import { UsersService } from './users.service';
import { BcryptModule } from '@make-pi/shared/bcrypt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    BcryptModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}

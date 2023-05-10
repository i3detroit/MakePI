import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { BcryptModule } from '@make-pi/shared/bcrypt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '@make-pi/shared/database';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    BcryptModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

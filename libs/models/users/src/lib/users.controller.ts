import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegiserUserDto, UpdateUserDto } from './users.dto';
import { ReturnCreatedUser } from './users.interface';
import { User } from '@make-pi/shared/database';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: RegiserUserDto): Promise<ReturnCreatedUser> {
    return await this.usersService.create(data);
  }

  @Put(':userId')
  async updateUser(
    @Body() data: UpdateUserDto,
    @Param('userId') userId: string
  ) {
    return await this.usersService.update(userId, data);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.usersService.findOneById(userId);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    return await this.usersService.delete(userId);
  }
}

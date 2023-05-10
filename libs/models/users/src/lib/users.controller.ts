import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './users.interface';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUser) {
    const user = await this.usersService.create(data);
    return { id: user.id };
  }
}

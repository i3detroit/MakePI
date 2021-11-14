import { UsersService } from '@make-pi/models/users';
import { AuthGuard } from '@make-pi/shared/auth';
import { Role, User } from '@make-pi/shared/database';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('admin/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'user',
    action: 'create',
    possession: 'any',
  })
  async createUser() {
    return {};
  }

  @Post(':id/role')
  addRole(@Param() param, @Body() body): Promise<Role> {
    return this.usersService.addRole(param.id, body.role);
  }

  @Get(':id')
  get(@Param() param): Promise<User> {
    return this.usersService.findOneById(param.id);
  }
}

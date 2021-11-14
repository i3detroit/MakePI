import {
  AddRoleDto,
  ReturnCreatedUser,
  UserIdDto,
  UsersService,
} from '@make-pi/models/users';
import { AuthGuard, RegisterUserDto } from '@make-pi/shared/auth';
import { Role, User } from '@make-pi/shared/database';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { DeleteResult } from 'typeorm';

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
  @UsePipes(new ValidationPipe())
  createUser(@Body() body: RegisterUserDto): Promise<ReturnCreatedUser> {
    return this.usersService.create(body);
  }

  @Post(':id/add-role')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'role',
    action: 'create',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  addRole(@Param() param: UserIdDto, @Body() body: AddRoleDto): Promise<Role> {
    return this.usersService.addRole(param.id, body.role);
  }

  @Post(':id/remove-role')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'role',
    action: 'delete',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  removeRole(
    @Param() param: UserIdDto,
    @Body() body: AddRoleDto
  ): Promise<DeleteResult> {
    return this.usersService.removeRole(param.id, body.role);
  }

  @Get(':id')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'user',
    action: 'read',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  get(@Param() param: UserIdDto): Promise<User> {
    return this.usersService.findOneById(param.id);
  }
}

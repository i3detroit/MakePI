import {
  AddRoleDto,
  ReturnCreatedUser,
  UserIdDto,
  UsersService,
} from '@make-pi/models/users';
import {
  AuthGuard,
  changeRoleErrors,
  createUserErrors,
  RegisterUserDto,
} from '@make-pi/shared/auth';
import { Role, User } from '@make-pi/shared/database';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
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
  async createUser(@Body() body: RegisterUserDto): Promise<ReturnCreatedUser> {
    try {
      return await this.usersService.create(body);
    } catch (err) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new ConflictException({
            message: [createUserErrors.DUPLICATE_USER_ID],
          });
        default:
          throw new BadRequestException({ message: [err.message] });
      }
    }
  }

  @Post(':id/add-role')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'role',
    action: 'create',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  async addRole(
    @Param() param: UserIdDto,
    @Body() body: AddRoleDto
  ): Promise<Role> {
    try {
      return await this.usersService.addRole(param.id, body.role);
    } catch (err) {
      switch (err.code) {
        case 'ER_DUP_ENTRY':
          throw new ConflictException({
            message: [changeRoleErrors.DUPLICATE_ROLE],
          });
        default:
          throw new BadRequestException({ message: [err.message] });
      }
    }
  }

  @Post(':id/remove-role')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'role',
    action: 'delete',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  async removeRole(
    @Param() param: UserIdDto,
    @Body() body: AddRoleDto
  ): Promise<DeleteResult> {
    try {
      return await this.usersService.removeRole(param.id, body.role);
    } catch (err) {
      switch (err.code) {
        default:
          throw new BadRequestException({ message: [err.message] });
      }
    }
  }

  @Get(':id')
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'user',
    action: 'read',
    possession: 'any',
  })
  @UsePipes(new ValidationPipe())
  async get(@Param() param: UserIdDto): Promise<User> {
    try {
      const user = await this.usersService.findOneById(param.id);
      if (!user) throw new NotFoundException();
      return user;
    } catch (err) {
      switch (err.code) {
        default:
          throw new BadRequestException({ message: [err.message] });
      }
    }
  }
}

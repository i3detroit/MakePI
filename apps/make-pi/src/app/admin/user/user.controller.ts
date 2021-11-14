import { AuthGuard, AuthService, RegisterUserDto } from '@make-pi/shared/auth';
import { AccessGuard } from '@make-pi/shared/access';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UseRoles } from 'nest-access-control';

@Controller('admin/user')
@UseGuards(AuthGuard, AccessGuard)
@UseRoles({
  resource: 'user',
  action: 'create',
  possession: 'any',
})
@UseRoles({
  resource: 'user',
  action: 'update',
  possession: 'any',
})
@UseRoles({
  resource: 'user',
  action: 'delete',
  possession: 'any',
})
@UseRoles({
  resource: 'user',
  action: 'read',
  possession: 'any',
})
export class UserController {
  constructor(private authService: AuthService) {}

  @Post()
  async createUser(@Body() body: RegisterUserDto) {
    const user = await this.authService.register(body);
    return user;
  }
}

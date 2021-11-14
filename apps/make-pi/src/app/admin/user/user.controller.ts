import { AuthGuard, AuthService } from '@make-pi/shared/auth';
import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('admin/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private authService: AuthService) {}

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

  @Post(':id/role/:role')
  async addRole(@Param() params) {
    await this.authService;
  }
}

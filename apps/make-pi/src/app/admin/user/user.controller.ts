import { AuthService } from '@make-pi/shared/auth';
import { Controller } from '@nestjs/common';

@Controller('admin/user')
export class UserController {
  constructor(private authService: AuthService) {}
}

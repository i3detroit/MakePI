import { Injectable } from '@nestjs/common';
import { AccessService } from './access.service';

@Injectable()
export class AccessStrategy {
  constructor(private accessService: AccessService) {}

  async checkAccess(request): Promise<boolean> {
    return true;
  }
}

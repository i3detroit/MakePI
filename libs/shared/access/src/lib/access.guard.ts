import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AccessStrategy } from './access.strategy';

/**
 * AccessGuard
 */
@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private strategy: AccessStrategy) {}

  /**
   * AccessGuard - Can activate method
   *
   * @param context - Details about the current request pipeline.
   * @returns - True if Access is granted
   */
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.strategy.checkAccess(request);
  }
}

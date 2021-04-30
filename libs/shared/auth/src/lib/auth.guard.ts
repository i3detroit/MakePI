import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

/**
 * AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private strategy: JwtStrategy) {}

  /**
   * AuthGuard - Can activate method
   *
   * @param context - Details about the current request pipeline.
   * @returns - True if JWT is valid and unexpired
   */
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.strategy.validate(request);
  }
}

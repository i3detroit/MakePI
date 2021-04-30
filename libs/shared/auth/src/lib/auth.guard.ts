import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private strategy: JwtStrategy) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.strategy.validate(request);
  }
}

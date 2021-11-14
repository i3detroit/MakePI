import { Injectable } from '@nestjs/common';
import { Claim, ClaimVerifyResult } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@make-pi/models/users';

/**
 * JWT Strategy for AuthGuard
 */
@Injectable()
export class JwtStrategy {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  /**
   * Validate JWT in Request
   *
   * @param request - Request
   * @returns - True if JWT is valid
   */
  public async validate(request): Promise<boolean> {
    const result = await this._handler(request);
    if (result.isValid) {
      const user = await this.usersService.getRoles(result.claim.sub);
      if (user) {
        request.user = {
          ...result.claim,
          roles: user.roles.map((n) => n.role),
        };
        return result.isValid;
      }
      return false;
    }
    return result.isValid;
  }

  /**
   * AuthGuard Handler
   *
   * @param request - Request
   * @returns - Claim Verification Result
   */
  private async _handler(request): Promise<ClaimVerifyResult> {
    let result: ClaimVerifyResult;

    try {
      const token = request.headers.authorization.replace(
        /^Bearer\s(.*?)/,
        '$1'
      );
      const claim = await this.jwtService.verify<Claim>(token);
      result = {
        claim,
        isValid: true,
      };
    } catch (err) {
      result = {
        error: err,
        isValid: false,
      };
    }

    return result;
  }
}

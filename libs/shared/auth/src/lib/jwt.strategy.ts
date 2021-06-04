import { Injectable } from '@nestjs/common';
import { Claim, ClaimVerifyResult } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

/**
 * JWT Strategy for AuthGuard
 */
@Injectable()
export class JwtStrategy {
  constructor(private jwtService: JwtService) {}

  /**
   * Validate JWT in Request
   *
   * @param request - Request
   * @returns - True if JWT is valid
   */
  public async validate(request): Promise<boolean> {
    const result = await this._handler(request);
    if (result.isValid) {
      request.user = result.claim;
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  Claim,
  ClaimVerifyResult,
  failedLoginMessages,
  FailedLoginReasons,
} from './auth.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy {
  private jwtSecret = this.configService.get<string>(
    'JWT_SECRET',
    'hard!to-guess_secret'
  );

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  public async validate(request): Promise<boolean> {
    try {
      const result = await this._handler(request);
      if (result.isValid) {
        request.user = result.claim;
      }
      return result.isValid;
    } catch (err) {
      throw new UnauthorizedException({
        message: [failedLoginMessages[err.message]],
      });
    }
  }

  private async _handler(request): Promise<ClaimVerifyResult> {
    let result: ClaimVerifyResult;

    try {
      const token = request.headers.authorization.replace(
        /^Bearer\s(.*?)/,
        '$1'
      );
      const claim = await this.jwtService.verify<Claim>(token);
      const currentEpoch = Math.floor(new Date().valueOf() / 1000);

      if (claim.exp && currentEpoch > claim.exp) {
        throw new Error(FailedLoginReasons.JWT_EXPIRED);
      }

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

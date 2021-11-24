import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

const validToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eHh4eHgiLCJpYXQiOjE2MjI3NzYxMDJ9.eeKhTJ9_kZCHMzvGYVodVFWzHfBf87Hdqp_ceK2F1iQ';
const invalidSignature =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eHh4eHgiLCJpYXQiOjE2MjI3NzcxMDV9.URPqDZfwClH8YFOTIrTCsOOR_glf9j112RE-MB8GE9E';
const expiredJwt =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4eHh4eHgiLCJpYXQiOjE2MjI3NzkzMDYsImV4cCI6MTYyMjc3OTMwN30.dsSSrDiBz66yN_TIZNYSHUciN6MKGMsmFccORVmfTLk';

describe('JwtStrategy::', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'JWT_STRATEGY',
          useClass: JwtStrategy,
        },
      ],
      imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
    }).compile();
    jwtStrategy = module.get<JwtStrategy>('JWT_STRATEGY');
  });

  it('Should return true on valid signed JWT', async () => {
    const request: any = {
      headers: {
        authorization: validToken,
      },
    };
    const valid = await jwtStrategy.validate(request);
    expect(request.user.sub).toEqual('xxxxxx');
    expect(request.user.iat).toEqual(1622776102);
    expect(valid).toBe(true);
  });

  it('Should return false on invalid signed JWT', async () => {
    const request: any = {
      headers: {
        authorization: invalidSignature,
      },
    };
    const valid = await jwtStrategy.validate(request);
    expect(valid).toBe(false);
    expect(request.user).toBeFalsy();
  });

  it('Should return false if JWT expired', async () => {
    const request: any = {
      headers: {
        authorization: expiredJwt,
      },
    };
    const valid = await jwtStrategy.validate(request);
    expect(valid).toBe(false);
    expect(request.user).toBeFalsy();
  });
});

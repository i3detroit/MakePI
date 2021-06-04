import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

const mockContext: any = {
  switchToHttp: () => ({
    getRequest: jest.fn(),
    getResponse: jest.fn(),
  }),
};

describe('AuthGuard::', () => {
  let authGuard: AuthGuard;
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'AUTH_GUARD',
          useClass: AuthGuard,
        },
        JwtStrategy,
      ],
      imports: [JwtModule.register({ secret: 'hard!to-guess_secret' })],
    }).compile();
    authGuard = module.get<AuthGuard>('AUTH_GUARD');
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('Should pass validation', async () => {
    const spy = jest.spyOn(jwtStrategy, 'validate');
    spy.mockResolvedValue(true);
    const result = await authGuard.canActivate(mockContext);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('Should fail validation', async () => {
    const spy = jest.spyOn(jwtStrategy, 'validate');
    spy.mockResolvedValue(false);
    const result = await authGuard.canActivate(mockContext);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result).toBe(false);
  });
});

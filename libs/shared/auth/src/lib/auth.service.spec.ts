import { UsersService } from '@make-pi/models/users';
import * as moment from 'moment-timezone';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { BcryptService } from '@make-pi/shared/bcrypt';

const id = 'uuid-id-user';

const password = '1234567890';

const mockToken = 'mocktoken!!!';

const mockUser = {
  id,
  email: 'email@example.com',
  password: '$$$hash$$$',
};

describe('AuthService::', () => {
  let service: AuthService;
  let usersService: UsersService;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UsersService',
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
            findOneById: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn(),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: 'JwtService',
          useValue: {
            sign: jest.fn().mockReturnValue(mockToken),
          },
        },
        {
          provide: 'BcryptService',
          useValue: {
            compare: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: 'ConfigService',
          useValue: {
            get: jest.fn().mockReturnValue('foobar'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', async () => {
    expect(service).toBeTruthy();
  });

  describe('Login::', () => {
    it('Should login and return token', async () => {
      const mockClaim = await service.login({
        email: mockUser.email,
        password,
        remember: true,
      });
      expect(mockClaim.token).toEqual(mockToken);
    });

    it('Should throw error if user not found', async () => {
      const mockReturnNoUser = jest.fn().mockResolvedValue(false);
      usersService.findOneByEmail = mockReturnNoUser;
      let error: Error;
      try {
        await service.login({
          email: mockUser.email,
          password: password,
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('NOT_FOUND');
    });

    it('Should throw error if account is locked', async () => {
      const mockReturnLockedAccount = jest.fn().mockResolvedValue({
        ...mockUser,
        lockUntil: moment().add(10, 'minutes').toISOString(),
      });
      usersService.findOneByEmail = mockReturnLockedAccount;
      let error: Error;
      try {
        await service.login({
          email: mockUser.email,
          password: password,
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('ACCOUNT_LOCKED');
    });

    it('Should throw error if password does not match hash', async () => {
      const mockReturnUnmatchedPassword = jest.fn().mockResolvedValue(false);
      bcryptService.compare = mockReturnUnmatchedPassword;
      let error: Error;
      try {
        await service.login({
          email: mockUser.email,
          password: password,
        });
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('PASSWORD_INCORRECT');
    });
  });

  describe('Register::', () => {
    it('Should create new user and return token', async () => {
      const mockClaim = await service.register({
        email: mockUser.email,
        password,
      });
      expect(mockClaim.token).toEqual(mockToken);
    });
  });

  describe('IncreaseLoginAttempts::', () => {
    it('Should increase number of login attempts', async () => {
      await service.increaseLoginAttempts(id);
    });

    it('Should reset login attempts if account lock has expired', async () => {
      const mockReturnLockedAccountOverExp = jest.fn().mockResolvedValue({
        lockUntil: moment().subtract(10, 'minutes').toISOString(),
      });
      usersService.findOneById = mockReturnLockedAccountOverExp;
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.increaseLoginAttempts(id);
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].loginAttempts).toEqual(1);
      expect(userUpdateSpy.mock.calls[0][1].lockUntil).toBeNull();
    });

    it('Should lock account if max login attempts reached', async () => {
      const mockReturnUserMaxLoginAttempts = jest.fn().mockResolvedValue({
        loginAttempts: 10,
      });
      usersService.findOneById = mockReturnUserMaxLoginAttempts;
      service['maxLoginAttempts'] = 10;
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.increaseLoginAttempts(id);
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].loginAttempts).toEqual(11);
      expect(moment(userUpdateSpy.mock.calls[0][1].lockUntil).isValid()).toBe(
        true
      );
    });
  });

  describe('ResetLoginAttempts::', () => {
    it('Should reset login attempts', async () => {
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.resetLoginAttempts(id);
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].loginAttempts).toEqual(0);
      expect(userUpdateSpy.mock.calls[0][1].lockUntil).toBeNull();
    });
  });

  describe('ChangePassword::', () => {
    const newPassword = 'newPassword123';
    it('Should change password', async () => {
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.changePassword(id, mockUser.password, newPassword);
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].password).toEqual(newPassword);
    });

    it('Should throw error if user not found', async () => {
      const mockReturnNoUser = jest.fn();
      usersService.findOneById = mockReturnNoUser;
      let error;
      try {
        await service.changePassword(id, mockUser.password, newPassword);
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('NOT_FOUND');
    });

    it('Should throw error if password does not match', async () => {
      const mockReturnUnmatchedPassword = jest.fn().mockResolvedValue(false);
      bcryptService.compare = mockReturnUnmatchedPassword;
      let error;
      try {
        await service.changePassword(id, mockUser.password, newPassword);
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('PASSWORD_INCORRECT');
    });
  });

  describe('RecoverCode::', () => {
    it('Should return recovery code', async () => {
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.recoverCode(mockUser.email);
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].recoverCode).toBeTruthy();
    });

    it('Should throw error if user not found', async () => {
      const mockReturnNoUser = jest.fn();
      usersService.findOneByEmail = mockReturnNoUser;
      let error;
      try {
        await service.recoverCode(mockUser.email);
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('NOT_FOUND');
    });
  });

  describe('ResetPassword::', () => {
    it('Should reset password', async () => {
      const mockReturnUser = jest.fn().mockResolvedValue({
        id,
        recoverCode: 'abcdefghijklmnop',
      });
      usersService.findOneByEmail = mockReturnUser;
      const userUpdateSpy = jest.spyOn(usersService, 'update');
      await service.resetPassword(
        mockUser.email,
        'abcdefghijklmnop',
        'newPassword123'
      );
      expect(userUpdateSpy).toHaveBeenCalledTimes(1);
      expect(userUpdateSpy.mock.calls[0][0]).toEqual(id);
      expect(userUpdateSpy.mock.calls[0][1].password).toEqual('newPassword123');
      expect(userUpdateSpy.mock.calls[0][1].recoverCode).toBeNull();
    });

    it('Should throw error if recovery code does not match', async () => {
      const mockReturnUser = jest.fn().mockResolvedValue({
        id,
        recoverCode: 'ponmlkjihgfedcba',
      });
      usersService.findOneByEmail = mockReturnUser;
      let error;
      try {
        await service.resetPassword(
          mockUser.email,
          'abcdefghijklmnop',
          'newPassword123'
        );
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('INVALID_RECOVERY_CODE');
    });

    it('Should throw error if user does not exist', async () => {
      const mockReturnNoUser = jest.fn();
      usersService.findOneByEmail = mockReturnNoUser;
      let error;
      try {
        await service.resetPassword(
          mockUser.email,
          'abcdefghijklmnop',
          'newPassword123'
        );
      } catch (err) {
        error = err;
      }
      expect(error.message).toEqual('NOT_FOUND');
    });
  });

  describe('RandomStringGenerator::', () => {
    it('Should generate a random string of a given length', async () => {
      const mockRandomString = service['_random'](5);
      expect(mockRandomString.length).toEqual(5);
    });
  });
});

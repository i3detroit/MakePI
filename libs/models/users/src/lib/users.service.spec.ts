import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseModule } from '@make-pi/shared/database';
import { BcryptService } from '@make-pi/shared/bcrypt';
import { ConfigService } from '@nestjs/config';

describe('ModelsUsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        UsersService,
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: 'ROLE_REPOSITORY',
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
        BcryptService,
        ConfigService,
      ],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

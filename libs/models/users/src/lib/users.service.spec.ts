import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseModule } from '@make-pi/shared/database';

describe('ModelsUsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UsersService, ...userProviders],
    }).compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

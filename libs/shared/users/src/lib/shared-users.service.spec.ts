import { Test } from '@nestjs/testing';
import { SharedUsersService } from './shared-users.service';

describe('SharedUsersService', () => {
  let service: SharedUsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedUsersService],
    }).compile();

    service = module.get(SharedUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

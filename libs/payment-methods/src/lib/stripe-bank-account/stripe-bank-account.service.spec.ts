import { Test, TestingModule } from '@nestjs/testing';
import { StripeBankAccountService } from './stripe-bank-account.service';

describe('StripeBankAccountService', () => {
  let service: StripeBankAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeBankAccountService],
    }).compile();

    service = module.get<StripeBankAccountService>(StripeBankAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

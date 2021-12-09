import { Test, TestingModule } from '@nestjs/testing';
import { StripeCreditCardService } from './stripe-credit-card.service';

describe('StripeCreditCardService', () => {
  let service: StripeCreditCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeCreditCardService],
    }).compile();

    service = module.get<StripeCreditCardService>(StripeCreditCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

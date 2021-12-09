import { Test, TestingModule } from '@nestjs/testing';
import { StripeChargesService } from './stripe-charges.service';

describe('StripeChargesService', () => {
  let service: StripeChargesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeChargesService],
    }).compile();

    service = module.get<StripeChargesService>(StripeChargesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

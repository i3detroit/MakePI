import { Test } from '@nestjs/testing';
import { SharedStripeService } from './shared-stripe.service';

describe('SharedStripeService', () => {
  let service: SharedStripeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedStripeService],
    }).compile();

    service = module.get(SharedStripeService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

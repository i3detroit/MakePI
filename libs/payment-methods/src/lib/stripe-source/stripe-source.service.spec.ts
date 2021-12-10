import { Test, TestingModule } from '@nestjs/testing';
import { StripeSourceService } from './stripe-source.service';

describe('StripeSourceService', () => {
  let service: StripeSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeSourceService],
    }).compile();

    service = module.get<StripeSourceService>(StripeSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

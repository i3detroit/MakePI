import { Test } from '@nestjs/testing';
import { ModelsPaymentSourceService } from './models-payment-source.service';

describe('ModelsPaymentSourceService', () => {
  let service: ModelsPaymentSourceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ModelsPaymentSourceService],
    }).compile();

    service = module.get(ModelsPaymentSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

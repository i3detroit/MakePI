import { Test } from '@nestjs/testing';
import { PaymentSourceService } from './payment-sources.service';

describe('PaymentSourceService', () => {
  let service: PaymentSourceService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentSourceService,
        {
          provide: 'PAYMENT_SOURCE_REPOSITORY',
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PaymentSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

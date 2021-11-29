import { Test } from '@nestjs/testing';
import { PaymentSourcesService } from './payment-sources.service';

describe('PaymentSourceService', () => {
  let service: PaymentSourcesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentSourcesService,
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

    service = module.get(PaymentSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

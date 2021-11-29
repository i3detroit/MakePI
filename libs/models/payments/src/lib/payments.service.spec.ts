import { Test } from '@nestjs/testing';
import { PaymentService } from './payments.service';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: 'PAYMENT_REPOSITORY',
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

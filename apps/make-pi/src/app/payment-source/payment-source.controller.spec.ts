import { Test, TestingModule } from '@nestjs/testing';
import { PaymentSourceController } from './payment-source.controller';

describe('PaymentSourceController', () => {
  let controller: PaymentSourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentSourceController],
    }).compile();

    controller = module.get<PaymentSourceController>(PaymentSourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

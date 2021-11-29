import { Module } from '@nestjs/common';
import { paymentSourceProviders } from './payment-source.providers';
import { PaymentSourceService } from './payment-source.service';

@Module({
  controllers: [],
  providers: [...paymentSourceProviders, PaymentSourceService],
  exports: [PaymentSourceService],
})
export class PaymentSourceModule {}

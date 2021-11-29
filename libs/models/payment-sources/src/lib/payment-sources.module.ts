import { Module } from '@nestjs/common';
import { paymentSourceProviders } from './payment-sources.providers';
import { PaymentSourceService } from './payment-sources.service';

@Module({
  controllers: [],
  providers: [...paymentSourceProviders, PaymentSourceService],
  exports: [PaymentSourceService],
})
export class PaymentSourceModule {}

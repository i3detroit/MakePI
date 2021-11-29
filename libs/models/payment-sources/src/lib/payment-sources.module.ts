import { Module } from '@nestjs/common';
import { paymentSourceProviders } from './payment-sources.providers';
import { PaymentSourcesService } from './payment-sources.service';

@Module({
  controllers: [],
  providers: [...paymentSourceProviders, PaymentSourcesService],
  exports: [PaymentSourcesService],
})
export class PaymentSourcesModule {}

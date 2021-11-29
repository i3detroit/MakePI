import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { paymentSourceProviders } from './payment-sources.providers';
import { PaymentSourcesService } from './payment-sources.service';

@Module({
  imports: [DatabaseModule],
  providers: [...paymentSourceProviders, PaymentSourcesService],
  exports: [PaymentSourcesService],
})
export class PaymentSourcesModule {}

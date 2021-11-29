import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { paymentProviders } from './payment.providers';
import { PaymentService } from './payment.service';

@Module({
  imports: [DatabaseModule],
  providers: [...paymentProviders, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}

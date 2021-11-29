import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { paymentProviders } from './payments.providers';
import { PaymentService } from './payments.service';

@Module({
  imports: [DatabaseModule],
  providers: [...paymentProviders, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}

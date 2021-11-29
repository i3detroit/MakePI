import { DatabaseModule } from '@make-pi/shared/database';
import { Module } from '@nestjs/common';
import { paymentProviders } from './payments.providers';
import { PaymentsService } from './payments.service';

@Module({
  imports: [DatabaseModule],
  providers: [...paymentProviders, PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

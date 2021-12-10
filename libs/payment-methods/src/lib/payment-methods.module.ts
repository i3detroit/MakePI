import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { SharedStripeModule } from '@make-pi/shared/stripe';
import { StripeSourceService } from './stripe-source/stripe-source.service';
import { UsersModule } from '@make-pi/models/users';
import { PaymentSourcesModule } from '@make-pi/models/payment-sources';

@Module({
  imports: [SharedStripeModule, UsersModule, PaymentSourcesModule],
  providers: [PaymentMethodsService, StripeSourceService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}

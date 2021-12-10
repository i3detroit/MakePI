import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { SharedStripeModule } from '@make-pi/shared/stripe';
import { StripeSourceService } from './stripe-source/stripe-source.service';
import { UsersModule } from '@make-pi/models/users';

@Module({
  imports: [SharedStripeModule, UsersModule],
  providers: [PaymentMethodsService, StripeSourceService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}

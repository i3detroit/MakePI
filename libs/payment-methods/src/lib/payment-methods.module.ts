import { Module } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { SharedStripeModule } from '@make-pi/shared/stripe';
import { AuthModule } from '@make-pi/shared/auth';
import { StripeSourceService } from './stripe-source/stripe-source.service';

@Module({
  imports: [SharedStripeModule, AuthModule],
  providers: [PaymentMethodsService, StripeSourceService],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}

import { Module } from '@nestjs/common';
import { StripeCreditCardService } from './stripe-credit-card/stripe-credit-card.service';
import { StripeBankAccountService } from './stripe-bank-account/stripe-bank-account.service';
import { PaymentMethodsService } from './payment-methods.service';

@Module({
  controllers: [],
  providers: [
    StripeCreditCardService,
    StripeBankAccountService,
    PaymentMethodsService,
  ],
  exports: [PaymentMethodsService],
})
export class PaymentMethodsModule {}

import { Module } from '@nestjs/common';
import { SharedSecretsModule } from '@make-pi/shared/secrets';
import { SecretNames } from '@make-pi/global-config';
import { StripeCustomersService } from './stripe-customers.service';
import { StripeChargesService } from './stripe-charges.service';

@Module({
  imports: [
    SharedSecretsModule.registerAsync({
      secrets: [SecretNames.SECRET_NAME_STRIPE_API_KEY],
    }),
  ],
  providers: [StripeCustomersService, StripeChargesService],
  exports: [StripeCustomersService, StripeChargesService],
})
export class SharedStripeModule {}

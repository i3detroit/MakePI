import { SecretNames } from '@make-pi/global-config';
import { SharedSecretsService } from '@make-pi/shared/secrets';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeChargesService {
  private stripe = new Stripe(
    this.sharedSecretsService.get<string>(
      SecretNames.SECRET_NAME_STRIPE_API_KEY
    ),
    { apiVersion: '2020-08-27' }
  );

  constructor(private sharedSecretsService: SharedSecretsService) {}

  create(
    params: Stripe.ChargeCreateParams
  ): Promise<Stripe.Response<Stripe.Charge>> {
    return this.stripe.charges.create(params);
  }
}

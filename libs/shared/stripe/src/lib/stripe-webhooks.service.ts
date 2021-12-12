import { SecretNames } from '@make-pi/global-config';
import { SharedSecretsService } from '@make-pi/shared/secrets';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeWebhooksService {
  private stripe = new Stripe(
    this.sharedSecretsService.get<string>(
      SecretNames.SECRET_NAME_STRIPE_API_KEY
    ),
    { apiVersion: '2020-08-27' }
  );

  private webhookSecret = this.sharedSecretsService.get<string>(
    SecretNames.SECRET_NAME_STRIPE_WEBHOOK_SECRET
  );

  constructor(private sharedSecretsService: SharedSecretsService) {}

  constructEvent(
    payload: string | Buffer,
    header: string | Buffer | string[],
    tolerance?: number,
    cryptoProvider?: Stripe.CryptoProvider
  ): Stripe.Event {
    return this.stripe.webhooks.constructEvent(
      payload,
      header,
      this.webhookSecret,
      tolerance,
      cryptoProvider
    );
  }
}

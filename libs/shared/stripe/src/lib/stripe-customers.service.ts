import { SecretNames } from '@make-pi/global-config';
import { SharedSecretsService } from '@make-pi/shared/secrets';
import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeCustomersService {
  private stripe = new Stripe(
    this.sharedSecretsService.get<string>(
      SecretNames.SECRET_NAME_STRIPE_API_KEY
    ),
    { apiVersion: '2020-08-27' }
  );

  constructor(private sharedSecretsService: SharedSecretsService) {}

  retrieve(
    id: string,
    params?: Stripe.CustomerRetrieveParams,
    options?: Stripe.RequestOptions
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return this.stripe.customers.retrieve(id, params, options);
  }

  create(
    params?: Stripe.CustomerCreateParams,
    options?: Stripe.RequestOptions
  ): Promise<Stripe.Response<Stripe.Customer>> {
    return this.stripe.customers.create(params, options);
  }

  createSource(
    id: string,
    params: Stripe.CustomerSourceCreateParams,
    options?: Stripe.RequestOptions
  ): Promise<Stripe.Response<Stripe.CustomerSource>> {
    return this.stripe.customers.createSource(id, params, options);
  }

  deleteSource(
    customerId: string,
    id: string,
    params?: Stripe.CustomerSourceDeleteParams,
    options?: Stripe.RequestOptions
  ): Promise<
    Stripe.Response<
      | Stripe.CustomerSource
      | Stripe.DeletedAlipayAccount
      | Stripe.DeletedBankAccount
      | Stripe.DeletedBitcoinReceiver
      | Stripe.DeletedCard
    >
  > {
    return this.stripe.customers.deleteSource(customerId, id, params, options);
  }

  verifySource(
    customerId: string,
    id: string,
    params?: Stripe.CustomerSourceVerifyParams,
    options?: Stripe.RequestOptions
  ): Promise<Stripe.Response<Stripe.BankAccount>> {
    return this.stripe.customers.verifySource(customerId, id, params, options);
  }
}

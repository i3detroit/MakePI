import { createUserErrors } from '@make-pi/shared/auth';
import { StripeCustomersService } from '@make-pi/shared/stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeBankAccountData } from '../payment-methods.interface';
import { UsersService } from '@make-pi/models/users';
import { PaymentSourcesService } from '@make-pi/models/payment-sources';
import { PaymentMethodTypes } from '@make-pi/global-config';
import { PaymentSource } from '@make-pi/shared/database';

@Injectable()
export class StripeSourceService {
  constructor(
    private stripeCustomersService: StripeCustomersService,
    private usersService: UsersService,
    private paymentSourcesService: PaymentSourcesService
  ) {}

  async create(
    userId: string,
    data: CreateStripeBankAccountData
  ): Promise<PaymentSource> {
    let customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>;

    const user = await this.usersService.findOneById(userId);
    let stripeCustomerId = user.stripeCustomerId;

    if (!user) throw new Error(createUserErrors.USER_NOT_FOUND);

    if (stripeCustomerId) {
      customer = await this.stripeCustomersService.retrieve(stripeCustomerId);
    } else {
      customer = await this.stripeCustomersService.create({
        email: user.email,
      });
      stripeCustomerId = customer.id;
      this.usersService.update(user.id, { stripeCustomerId });
    }

    const source = await this.stripeCustomersService.createSource(
      stripeCustomerId,
      {
        source: data.publicToken,
      }
    );

    const paymentSource = await this.paymentSourcesService.create({
      method: PaymentMethodTypes.STRIPE_SOURCE,
      userId: user.id,
      sourceId: source.id,
      metadata: {},
      verified: false,
      enabled: true,
    });

    return paymentSource;
  }

  async getCustomer(
    id: string
  ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
    return await this.stripeCustomersService.retrieve(id);
  }

  async getSource(
    customerId: string,
    id: string
  ): Promise<Stripe.Response<Stripe.CustomerSource>> {
    return await this.stripeCustomersService.retrieveSource(customerId, id);
  }
}

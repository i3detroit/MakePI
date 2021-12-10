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

    if (!user) throw new Error(createUserErrors.USER_NOT_FOUND);

    if (user.stripeCustomerId) {
      customer = await this.stripeCustomersService.retrieve(
        user.stripeCustomerId
      );
    } else {
      customer = await this.stripeCustomersService.create({
        email: user.id,
      });
      this.usersService.update(user.id, { stripeCustomerId: customer.id });
    }

    const source = await this.stripeCustomersService.createSource(userId, {
      source: data.publicToken,
    });

    const paymentSource = await this.paymentSourcesService.create({
      method: PaymentMethodTypes.STRIPE_SOURCE,
      userId: user.id,
      sourceId: source.id,
      metadata: {
        object: source.object,
      },
      verified: false,
      enabled: true,
    });

    return paymentSource;
  }
}

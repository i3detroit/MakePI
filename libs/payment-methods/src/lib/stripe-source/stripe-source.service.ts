import { createUserErrors } from '@make-pi/shared/auth';
import { StripeCustomersService } from '@make-pi/shared/stripe';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeBankAccountData } from '../payment-methods.interface';
import { PaymentSource } from '@make-pi/shared/database';
import { UsersService } from '@make-pi/models/users';

@Injectable()
export class StripeSourceService {
  constructor(
    private stripeCustomersService: StripeCustomersService,
    private usersService: UsersService
  ) {}

  async create(userId: string, data: CreateStripeBankAccountData) {
    let customer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>;

    const user = await this.usersService.findOneById(userId);

    if (!user) throw new Error(createUserErrors.USER_NOT_FOUND);

    try {
      if (user.stripeCustomerId) {
        customer = await this.stripeCustomersService.retrieve(
          user.stripeCustomerId
        );
      } else {
        customer = await this.stripeCustomersService.create({
          email: user.id,
        });
      }

      const source = await this.stripeCustomersService.createSource(userId, {
        source: data.publicToken,
      });

      const paymentSource = new PaymentSource();
      paymentSource.method = source.object;
      paymentSource.user = user;
      paymentSource.sourceId = source.id;
      paymentSource.metadata = {};
      paymentSource.verified = false;
      paymentSource.enabled = true;
    } catch (err) {
      console.error(err);
    }
  }
}

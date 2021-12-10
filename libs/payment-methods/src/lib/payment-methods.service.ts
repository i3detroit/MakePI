import { Injectable } from '@nestjs/common';
import { PaymentMethodTypes } from '@make-pi/global-config';
import { StripeSourceService } from './stripe-source/stripe-source.service';
import { CreateStripeBankAccountData } from './payment-methods.interface';

@Injectable()
export class PaymentMethodsService {
  constructor(private stripeSourceService: StripeSourceService) {}

  async create(
    type: PaymentMethodTypes,
    userId: string,
    data: CreateStripeBankAccountData
  ) {
    switch (type) {
      case PaymentMethodTypes.STRIPE_SOURCE:
        return await this.stripeSourceService.create(userId, data);
      default:
        throw new Error(`No handler for method ${type}`);
    }
  }
}

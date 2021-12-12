import { Injectable } from '@nestjs/common';
import { PaymentMethodTypes } from '@make-pi/global-config';
import { StripeSourceService } from './stripe-source/stripe-source.service';
import { CreateStripeBankAccountData } from './payment-methods.interface';
import { PaymentSourcesService } from '@make-pi/models/payment-sources';

@Injectable()
export class PaymentMethodsService {
  constructor(
    private stripeSourceService: StripeSourceService,
    private paymentSourcesService: PaymentSourcesService
  ) {}

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

  async getAllByUserId(id: string) {
    const user = await this.paymentSourcesService.findAllByUser(id);
    return await Promise.all(
      user.paymentSources.map(async (paymentSource) => {
        let source;
        switch (paymentSource.method as PaymentMethodTypes) {
          case PaymentMethodTypes.STRIPE_SOURCE:
            source = await this.stripeSourceService.getSource(
              user.stripeCustomerId,
              paymentSource.sourceId
            );
            return {
              ...paymentSource,
              metadata: {
                type: source.type,
                last4: source[source.type].last4,
                brand: source[source.type].brand,
                funding: source[source.type].funding,
                bankName: source[source.type].bank_name,
              },
            };
          default:
            throw new Error(`No handler for method ${paymentSource.method}`);
        }
      })
    );
  }
}

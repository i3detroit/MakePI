import { Injectable } from '@nestjs/common';
import { PaymentMethodTypes } from './payment-methods.interface';

@Injectable()
export class PaymentMethodsService {
  create(type: PaymentMethodTypes, data) {
    switch (type) {
      case PaymentMethodTypes.STRIPE_SOURCE:
        break;
      default:
        throw new Error(`No handler for method ${type}`);
    }
  }
}

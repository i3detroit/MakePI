export enum PaymentMethod {
  STRIPE_CC = 'STRIPE_CREDIT_CARD',
  STRIPE_ACH = 'STRIPE_ACH',
}

interface PaymentMethodDetails {
  brand: string;
  product: string;
  id: PaymentMethod;
}

interface PaymentMethods {
  [key: string]: PaymentMethodDetails;
}

export const paymentMethods: PaymentMethods = {
  STRIPE_CC: {
    brand: 'Stripe',
    product: 'Credit Card Payment',
    id: PaymentMethod.STRIPE_CC,
  },
  STRIPE_ACH: {
    brand: 'Stripe',
    product: 'ACH Payment',
    id: PaymentMethod.STRIPE_ACH,
  },
};

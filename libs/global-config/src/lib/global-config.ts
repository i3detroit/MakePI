export enum EnvNames {
  DEV = 'dev',
  PROD = 'prod',
}

export enum PaymentMethodTypes {
  STRIPE_SOURCE = 'STRIPE_SOURCE',
}

interface PaymentMethodDetails {
  brand: string;
  product: string;
  id: PaymentMethodTypes;
}

interface PaymentMethods {
  [key: string]: PaymentMethodDetails;
}

export const paymentMethods: PaymentMethods = {
  STRIPE_SOURCE: {
    brand: 'Stripe',
    product: 'Payment Source',
    id: PaymentMethodTypes.STRIPE_SOURCE,
  },
};

export enum SecretNames {
  SECRET_NAME_STRIPE_API_KEY = 'SECRET_NAME_STRIPE_API_KEY',
  SECRET_NAME_STRIPE_WEBHOOK_SECRET = 'SECRET_NAME_STRIPE_WEBHOOK_SECRET',
}

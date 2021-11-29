import { PaymentMethod } from '@make-pi/global-config';

export interface CreatePaymentSource {
  method: PaymentMethod;
  userId: string;
  sourceId: string;
  metadata;
  verified: boolean;
}

export interface UpdatePaymentSource {
  verified: boolean;
  enabled: boolean;
}

export interface PaymentSourceMetadata {
  brand?: string;
  last4?: string;
  funding?: string;
  bank_name?: string;
}

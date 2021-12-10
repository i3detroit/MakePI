import { PaymentMethodTypes } from '@make-pi/global-config';

export interface CreateStripeBankAccountData {
  paymentMethodType: PaymentMethodTypes;
  publicToken: string;
}

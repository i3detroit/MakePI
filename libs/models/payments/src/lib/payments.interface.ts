import { PaymentStatus } from '@make-pi/shared/database';

export interface CreatePayment {
  userId: string;
  paymentSourceId: string;
  amount: number;
  status: PaymentStatus;
  metadata?;
}

export interface UpdatePayment {
  status: PaymentStatus;
  metadata?;
}

import { Connection } from 'typeorm';
import { Payment } from '@make-pi/shared/database';

export const paymentProviders = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Payment),
  },
];

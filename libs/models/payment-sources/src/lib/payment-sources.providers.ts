import { Connection } from 'typeorm';
import { PaymentSource } from '@make-pi/shared/database';

export const paymentSourceProviders = [
  {
    provide: 'PAYMENT_SOURCE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentSource),
    inject: ['DATABASE_CONNECTION'],
  },
];

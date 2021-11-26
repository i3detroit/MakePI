import { Connection } from 'typeorm';
import { PaymentSource, User } from '@make-pi/shared/database';

export const userProviders = [
  {
    provide: 'PAYMENT_SOURCE_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentSource),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
];

import { createConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { PaymentSource } from './entities/payment-source';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USER,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [User, Role, PaymentSource],
        synchronize: true,
      }),
  },
];

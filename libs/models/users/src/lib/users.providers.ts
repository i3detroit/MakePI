import { Connection } from 'typeorm';
import { User, Role } from '@make-pi/shared/database';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DATABASE_CONNECTION'],
  },
];

import { Connection } from 'typeorm';
import { User, Access } from '@make-pi/shared/database';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ACCESS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Access),
    inject: ['DATABASE_CONNECTION'],
  },
];

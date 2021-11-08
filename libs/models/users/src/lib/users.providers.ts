import { Connection } from 'typeorm';
import { UserEntity, AccessEntity } from '@make-pi/shared/database';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ACCESS_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(AccessEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];

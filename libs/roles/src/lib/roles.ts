import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN_ACCESS = 'ADMIN_ACCESS',
  MEMBER = 'MEMBER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN_ACCESS)
  .createAny('user')
  .updateAny('user')
  .deleteAny('user')
  .readAny('user');

roles.grant(AppRoles.ADMIN_ACCESS).createAny('role').deleteAny('role');

roles.grant(AppRoles.MEMBER).updateOwn('user').readOwn('user');

roles
  .grant(AppRoles.MEMBER)
  .createOwn('payment')
  .updateOwn('payment')
  .readOwn('payment');

roles
  .grant(AppRoles.MEMBER)
  .createOwn('payment-source')
  .updateOwn('payment-source')
  .readOwn('payment-source');

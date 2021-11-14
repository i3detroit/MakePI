import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN_ACCESS = 'ADMIN_ACCESS',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.ADMIN_ACCESS)
  .createAny('user')
  .updateAny('user')
  .deleteAny('user');

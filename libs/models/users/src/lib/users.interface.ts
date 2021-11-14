import { AppRoles } from '@make-pi/roles';
import { IsEnum, IsUUID } from 'class-validator';

export interface CreateUser {
  email: string;
  password: string;
}

export interface UpdateUser {
  email?: string;
  password?: string;
  loginAttempts?: number;
  lockUntil?: Date;
  recoverCode?: string;
  active?: boolean;
  verificationCode?: string;
}

export interface ReturnCreatedUser {
  id: string;
  email: string;
  active: boolean;
}

export enum UserErrors {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export class AddRoleDto {
  @IsEnum(AppRoles)
  role: AppRoles;
}

export class UserIdDto {
  @IsUUID()
  id: string;
}

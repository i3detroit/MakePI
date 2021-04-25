import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export interface Register {
  email: string;
  password: string;
}

export interface Login extends Register {
  remember?: boolean;
}

export class LoginUserDto {
  @IsEmail()
  @Length(1, 1024)
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  remember?: boolean;
}

export class RegisterUserDto {
  @IsEmail()
  @Length(1, 1024)
  email: string;

  @IsString()
  password: string;
}

export interface AuthReturn {
  token: string;
}

export enum FailedLoginReasons {
  NOT_FOUND = 'NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  INVALID_RECOVERY_CODE = 'INVALID_RECOVERY_CODE',
}

export const failedLoginMessages = {
  NOT_FOUND: 'User not found',
  PASSWORD_INCORRECT: 'Incorrect password',
  ACCOUNT_LOCKED: 'Account locked',
  INVALID_RECOVERY_CODE: 'Invalid recovery code',
};

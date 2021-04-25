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
  NOT_FOUND = 'User not found',
  PASSWORD_INCORRECT = 'Incorrect password',
}

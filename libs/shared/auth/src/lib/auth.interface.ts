import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @Length(3, 1024)
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  remember?: boolean;
}

export interface AuthReturn {
  token: string;
}

export enum FailedLoginReasons {
  NOT_FOUND = 'User not found',
  PASSWORD_INCORRECT = 'Incorrect password',
}

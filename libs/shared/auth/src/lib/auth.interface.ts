import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

/**
 * Registration parameters
 */
export interface Register {
  /**
   * User login email address
   */
  email: string;

  /**
   * Hashed and salted user password
   */
  password: string;
}

/**
 * Login parameters
 */
export interface Login extends Register {
  /**
   * Remember account (Removes expiration from JWT Token)
   */
  remember?: boolean;
}

/**
 * Login User Validation
 */
export class LoginUserDto {
  @IsEmail()
  @Length(1, 1024)
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  remember?: boolean;
}

/**
 * Register User Validation
 */
export class RegisterUserDto {
  @IsEmail()
  @Length(1, 1024)
  email: string;

  @IsString()
  password: string;
}

/**
 * Recovery Code Validation
 */
export class RecoveryCodeDto {
  @IsString()
  email: string;
}

/**
 * Reset Password Validation
 */
export class ResetPasswordDto {
  @IsString()
  email: string;

  @IsString()
  recoverCode: string;

  @IsString()
  newPassword: string;
}

/**
 * Change Password Validation
 */
export class ChangePasswordDto {
  @IsString()
  password: string;

  @IsString()
  newPassword: string;
}

/**
 * Authorization Return Object
 */
export interface AuthReturn {
  /**
   * JWT Token
   */
  token: string;
}

/**
 * JWT Claim object
 */
export interface Claim {
  /**
   * User primary index ID
   */
  sub: string;

  /**
   * User login email address
   */
  email: string;

  /**
   * Seconds from epoch JWT was signed
   */
  iat: number;

  /**
   * Expiration timestamp
   */
  exp?: number;
}

/**
 * Claim Verification Result
 */
export interface ClaimVerifyResult {
  /**
   * Claim object
   */
  readonly claim?: Claim;

  /**
   * Returns true if Claim is valid
   */
  readonly isValid: boolean;

  /**
   * Error
   */
  readonly error?: Error;
}

export interface AppRequest {
  user: Claim;
}

/**
 * Failed Login Reasons
 */
export enum FailedLoginReasons {
  NOT_FOUND = 'NOT_FOUND',
  PASSWORD_INCORRECT = 'PASSWORD_INCORRECT',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  INVALID_RECOVERY_CODE = 'INVALID_RECOVERY_CODE',
  JWT_EXPIRED = 'JWT_EXPIRED',
}

/**
 * Failed Login Messages
 */
export const failedLoginMessages = {
  NOT_FOUND: 'User not found',
  PASSWORD_INCORRECT: 'Incorrect password',
  ACCOUNT_LOCKED: 'Account locked',
  INVALID_RECOVERY_CODE: 'Invalid recovery code',
  JWT_EXPIRED: 'Authorization expired',
};

export const createUserErrors = {
  DUPLICATE_USER_ID: 'User already exists',
  USER_NOT_FOUND: 'User not found',
};

export const changeRoleErrors = {
  DUPLICATE_ROLE: 'User already has this role',
};

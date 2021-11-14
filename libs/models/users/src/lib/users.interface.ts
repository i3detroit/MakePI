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

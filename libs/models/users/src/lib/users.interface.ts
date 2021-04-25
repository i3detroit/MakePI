export interface CreateUser {
  email: string;
  password: string;
}

export interface ReturnCreatedUser {
  id: string;
  email: string;
  active: boolean;
}

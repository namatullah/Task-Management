export interface LoginFormType {
  email?: string;
  password?: string;
}
export interface User extends LoginFormType {
  id?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
export interface RegisterFormType extends LoginFormType {
  role?: string;
  firstName?: string;
  lastName?: string;
}

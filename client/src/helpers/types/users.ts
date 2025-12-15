export interface LoginFormType {
  email?: string;
  password?: string;
}
export interface User extends LoginFormType {
  id?: string;
  role?: string;
  name?: string;
  email?: string;
  password?: string;
}
export interface RegisterFormType extends LoginFormType {
  role?: string;
  name?: string;
}

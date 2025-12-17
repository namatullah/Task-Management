export interface UserType {
  id?: string;
  email?: string;
  role?: string;
  name?: string;
}
export interface LoginFormType {
  email?: string;
  password?: string;
}

export interface RegisterFormType extends LoginFormType {
  role?: string;
  name?: string;
}

export interface User extends UserType {
  password?: string;
}

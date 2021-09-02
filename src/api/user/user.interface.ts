import { Role } from '~/constants/auth/role';

export namespace IUser {
  export interface Model extends Schema {
    _id: string;
    password: string;
    createAt: number;
    lastLogin: number;
    __v: number;
  }

  export interface Schema {
    email: string;
    role: Role;
  }
}

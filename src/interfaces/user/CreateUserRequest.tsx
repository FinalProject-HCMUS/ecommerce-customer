import { Role } from './Role';

export interface CreateUserRequest {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}

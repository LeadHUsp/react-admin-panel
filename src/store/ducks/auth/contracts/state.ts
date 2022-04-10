import { LoadingStatus } from '../../../types';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
  fullName: string;
}

export interface AuthState {
  userData: User | null;
  status: LoadingStatus;
  isAuth: boolean;
}

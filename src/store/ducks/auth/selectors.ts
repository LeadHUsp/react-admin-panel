import { RootState } from '../../store';
import { AuthState } from './contracts/state';

export const selectIsAuth = (state: RootState): AuthState['isAuth'] => state.auth.isAuth;

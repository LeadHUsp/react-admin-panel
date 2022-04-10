import {
    FetchSignInActionInterface,
    FetchSignOutActionInterface,
    SetUserAuthStatusActionInterface,
    SetUserDataActionInterface,
} from './contracts/types';
import {
    AuthActionsType,
    SetUserLoadingStatusActionInterface,
    VerifyUserActionInterface,
    SignInUserErrorActionInterface,
} from './contracts/types';
import { User, AuthState } from './contracts/state';

export const fetchSignIn = (payload: any): FetchSignInActionInterface => ({
    type: AuthActionsType.FETCH_SIGN_IN,
    payload,
});
export const verifyUser = (): VerifyUserActionInterface => ({
    type: AuthActionsType.VERIFY_USER,
});
export const signInError = (): SignInUserErrorActionInterface => ({
    type: AuthActionsType.VERIFY_ERROR,
});
export const setUserLoadingStatus = (
    payload: AuthState['status']
): SetUserLoadingStatusActionInterface => ({
    type: AuthActionsType.SET_LOADING_STATE,
    payload,
});
export const setUserAuthStatus = (
    payload: AuthState['isAuth']
): SetUserAuthStatusActionInterface => ({
    type: AuthActionsType.SET_AUTH_STATE,
    payload,
});
export const setUserData = (payload: User): SetUserDataActionInterface => ({
    type: AuthActionsType.SET_USER_DATA,
    payload,
});
export const fetchSignOut = (): FetchSignOutActionInterface => ({
    type: AuthActionsType.SIGN_OUT,
});

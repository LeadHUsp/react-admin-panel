import { Action } from 'redux';
import { LoadingStatus } from '../../../types';

import { User } from './state';

export enum AuthActionsType {
    SET_USER_DATA = 'user/SET_USER_DATA',
    VERIFY_USER = 'user/VERIFY_USER',
    VERIFY_ERROR = 'user/VERIFY_ERROR',
    FETCH_SIGN_IN = 'user/FETCH_SIGN_IN',
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    SET_LOADING_STATE = 'user/SET_LOADING_STATE',
    SET_AUTH_STATE = 'user/SET_AUTH_STATE',
    SIGN_OUT = 'user/SIGN_OUT',
}

export interface FetchSignInActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.FETCH_SIGN_IN;
    payload: any;
}
export interface VerifyUserActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.VERIFY_USER;
}
export interface SignInUserErrorActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.VERIFY_ERROR;
}
export interface SetUserLoadingStatusActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export interface SetUserAuthStatusActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_AUTH_STATE;
    payload: boolean;
}
export interface SetUserDataActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SET_USER_DATA;
    payload: User;
}
export interface FetchSignOutActionInterface extends Action<AuthActionsType> {
    type: AuthActionsType.SIGN_OUT;
}

import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { AuthState } from './contracts/state';
import { AuthActionsType } from './contracts/types';

const initialState: AuthState = {
    userData: null,
    status: LoadingStatus.NEVER,
    isAuth: false,
};

export const authReducer = produce((draft: Draft<AuthState>, action) => {
    switch (action.type) {
        case AuthActionsType.FETCH_SIGN_IN:
            draft.userData = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;
        case AuthActionsType.VERIFY_USER:
            draft.status = LoadingStatus.SUCCESS;
            break;
        case AuthActionsType.SET_AUTH_STATE:
            draft.isAuth = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;
        case AuthActionsType.SET_USER_DATA:
            draft.userData = action.payload;
            break;
        case AuthActionsType.VERIFY_ERROR:
            draft.isAuth = false;
            draft.status = LoadingStatus.SUCCESS;
            break;
        default:
            break;
    }
}, initialState);

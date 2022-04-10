import { call, put, takeLatest } from 'redux-saga/effects';
import { authApi } from '../../../services/api';
import { LoadingStatus } from '../../types';
import {
    FetchSignInActionInterface,
    AuthActionsType,
    VerifyUserActionInterface,
} from './contracts/types';
import {
    setUserAuthStatus,
    setUserData,
    setUserLoadingStatus,
    signInError,
} from './actions';

export function* fetchSignInRequest({ payload }: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));

        const { data } = yield call(authApi.signIn, payload);
        yield put(setUserData(data.user));
        yield put(setUserAuthStatus(true));
        /*     console.log(data); */
        window.localStorage.setItem('token', `Bearer ${data.token}`);
        /* yield put(setUserData(data)); */
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
        yield put(signInError());
    }
}
export function* verifyUser() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(authApi.verify);
        /*     console.log(data); */
        yield put(setUserData(data.user));
        yield put(setUserAuthStatus(true));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
        yield put(signInError());
    }
}
export function* signOutUser() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        // yield call(authApi.signOut);
        yield window.localStorage.clear();
        yield put(setUserAuthStatus(false));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}
export function* authSaga() {
    yield takeLatest(AuthActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(AuthActionsType.VERIFY_USER, verifyUser);
    yield takeLatest(AuthActionsType.SIGN_OUT, signOutUser);
}

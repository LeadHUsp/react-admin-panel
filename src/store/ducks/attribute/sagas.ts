import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadingStatus } from '../../types';
import {
    setAttributeGroupData,
    setAttributeLoadingStatus,
    setTotalPages,
} from './actions';
import {
    AttributeActionType,
    FetchAttributeGroupDataActionInterface,
} from './contracts/types';
import { AttributeApi } from 'services/api';

export function* fetchAttributeGroupRequest({
    str,
    page,
}: FetchAttributeGroupDataActionInterface) {
    try {
        yield put(setAttributeLoadingStatus(LoadingStatus.LOADING));
        const {
            data,
            headers: { x_totalpages },
        } = yield call(AttributeApi.getAllAttributeGroup, str, page);
        yield put(setAttributeGroupData(data));
        yield put(setTotalPages(Number(x_totalpages)));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(setAttributeLoadingStatus(LoadingStatus.LOADED));
    }
}

export function* attributeSaga() {
    yield takeLatest(
        AttributeActionType.FETCH_ATTRIBUTE_GROUP_DATA,
        fetchAttributeGroupRequest
    );
}

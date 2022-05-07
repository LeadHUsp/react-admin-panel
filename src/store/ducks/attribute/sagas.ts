import { call, put, takeLatest } from 'redux-saga/effects';
import { LoadingStatus } from '../../types';
import {
    setAttributeGroupData,
    setAttributeLoadingStatus,
    setTotalPages,
    setAttributeGroupIds,
} from './actions';
import {
    AttributeActionType,
    FetchAttributeGroupDataActionInterface,
    IFetchDeleteSingleAttribute,
} from './contracts/types';
import { AttributeApi } from 'services/api';
import { AttributeGroup } from './contracts/state';

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
        const idsArray = data.map((item: AttributeGroup) => item._id);
        yield put(setAttributeGroupIds(idsArray));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(setAttributeLoadingStatus(LoadingStatus.LOADED));
    }
}
export function* deleteSingleAttributeGroupRequest({
    payload,
    str,
    page,
}: IFetchDeleteSingleAttribute) {
    try {
        yield put(setAttributeLoadingStatus(LoadingStatus.LOADING));
        yield call(AttributeApi.deleteSingleAttribute, payload);
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
    yield takeLatest(
        AttributeActionType.FETCH_DELETE_ATTRIBUTE_GROUP_SINGLE,
        fetchAttributeGroupRequest
    );
}

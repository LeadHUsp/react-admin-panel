import { call, put, takeLatest } from 'redux-saga/effects';
import { categoriesApi } from '../../../services/api';
import { transformMultilevelDepth } from 'helpers/arrayFormating';

import { LoadingStatus } from '../../types';

import { CategoryActionType, DeleteSingleCategoryRequest } from './contracts/types';
import {
    setCategoriesData,
    setCategoriesLoadingStatus,
    fetchCategoriesData,
} from './actions';

export function* fetchCategoriesRequest() {
    try {
        yield put(setCategoriesLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(categoriesApi.getCategories);
        yield put(setCategoriesData(data));
        const formatedCategories = transformMultilevelDepth(data, 'children');
        yield put({
            type: CategoryActionType.SET_FLAT_ARRAY_OF_CATEGORIES,
            payload: formatedCategories,
        });
    } catch (error) {
        console.log(error);
    }
}
export function* deleteSingleCategoryRequestSaga({
    payload,
}: DeleteSingleCategoryRequest) {
    try {
        yield put(setCategoriesLoadingStatus(LoadingStatus.LOADING));
        yield call(categoriesApi.deleteSingleCategoryItem, payload);
        yield put(fetchCategoriesData());
    } catch (error) {
        console.log(error);
    }
}
export function* categoriesSaga() {
    yield takeLatest(CategoryActionType.FETCH_CATEGORIES_DATA, fetchCategoriesRequest);
    yield takeLatest(
        CategoryActionType.DELETE_SINGLE_CATEGORY_REQUEST,
        deleteSingleCategoryRequestSaga
    );
}

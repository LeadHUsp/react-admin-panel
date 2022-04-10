import { call, put, takeLatest, select } from 'redux-saga/effects';
import { galleryApi } from '../../../services/api';

import { LoadingStatus } from '../../types';

import {
    DeleteSingleGalleryItemRequestActionInterface,
    GalleryActionType,
    FetchGalleryItemsActionInterface,
    FetchSingleGalleryItemActionInterface,
    UploadChangeGalleryItemActionInterface,
} from './contracts/types';
import {
    fetchGalleryItems,
    setGalleryItems,
    setGalleryLoadingStatus,
    clearChoosedItems,
    setTotalPages,
    setEditGalleryItem,
    setChangeNotSaved,
} from './actions';
import { RootState } from 'store/store';
import { ChoosedItem } from './contracts/state';

export function* fetchGalleryItemsRequest({ payload }: FetchGalleryItemsActionInterface) {
    try {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADING));
        const {
            data: { data, total_pages },
        } = yield call(galleryApi.getGallleryItems, payload ? payload : undefined);
        yield put(setGalleryItems(data));
        yield put(setTotalPages(Number(total_pages)));
    } catch (error) {
        console.log(error);
    }
}

export function* deleteSingleGalleryItemRequest({
    payload,
}: DeleteSingleGalleryItemRequestActionInterface) {
    try {
        yield call(galleryApi.deleteGalleryItems, { [payload._id]: payload });
        yield put(fetchGalleryItems());
    } catch (error) {
        console.log(error);
    }
}
export function* deletedChoosedItemsRequest() {
    try {
        const choosedItems: ChoosedItem = yield select(
            (state: RootState) => state.gallery.choosed_items
        );

        yield call(galleryApi.deleteGalleryItems, { ...choosedItems });
        yield put(clearChoosedItems());
        yield put(fetchGalleryItems());
    } catch (error) {
        console.log(error);
    }
}
function* fetchSingleGalleryItemRequest({
    payload,
}: FetchSingleGalleryItemActionInterface) {
    try {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(galleryApi.getSingleGalleryItem, payload);
        yield put(setEditGalleryItem(data));
    } catch (error) {
        console.log(error);
    }
}
function* uploadChangeGalleryItemRequest({
    payload,
}: UploadChangeGalleryItemActionInterface) {
    try {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADING));
        const { data } = yield call(galleryApi.updateGalleryItem, payload);
        console.log(data);
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADED));
        yield put(setEditGalleryItem(data));
        yield put(setChangeNotSaved(false));
    } catch (error) {
        console.log(error);
    }
}
export function* gallerySaga() {
    yield takeLatest(GalleryActionType.FETCH_GALLERY_ITEMS, fetchGalleryItemsRequest);
    yield takeLatest(GalleryActionType.SET_CURRENT_PAGE, fetchGalleryItemsRequest);
    yield takeLatest(
        GalleryActionType.DELETE_SINGLE_GALLERY_ITEM,
        deleteSingleGalleryItemRequest
    );
    yield takeLatest(
        GalleryActionType.DELETE_CHOOSED_ITEMS_REQUEST,
        deletedChoosedItemsRequest
    );
    yield takeLatest(
        GalleryActionType.FETCH_SINGLE_GALLERY_ITEM,
        fetchSingleGalleryItemRequest
    );
    yield takeLatest(
        GalleryActionType.UPLOAD_CHANGE_GALLERY_ITEM,
        uploadChangeGalleryItemRequest
    );
}

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { galleryApi } from '../../../services/api';

import { LoadingStatus } from '../../types';

import {
    DeleteSingleGalleryItemRequestActionInterface,
    GalleryActionType,
    FetchGalleryItemsActionInterface,
    FetchSingleGalleryItemActionInterface,
    UploadChangeGalleryItemActionInterface,
    DeleteChoosedItemsRequestActionInterface,
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
import { setOpenNotification } from 'store/ducks/notification/actions';
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
        yield put(
            setOpenNotification({
                message: 'При загрузке данных произошла ошибка',
                severity: 'error',
            })
        );
    } finally {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADED));
    }
}

export function* deleteSingleGalleryItemRequest({
    payload,
}: DeleteSingleGalleryItemRequestActionInterface) {
    try {
        //удаляем текущие элементы
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADING));
        yield call(galleryApi.deleteGalleryItems, { [payload.item._id]: payload.item });
        const currentPage: number = yield select(
            (state: RootState) => state.gallery.current_page
        );
        const {
            data: { data, total_pages },
        } = yield call(galleryApi.getGallleryItems, currentPage);
        //если после удаление на текущей странице нет элементов, то
        //загружаем последнюю доступную страницу
        if (Number(total_pages) < currentPage) {
            //в модальном окне модификация истории не требуется
            !payload.modal && payload.history.replace(`/gallery/page=${total_pages}`);
            yield put(fetchGalleryItems(total_pages));
        } else {
            yield put(setGalleryItems(data));
        }
    } catch (error) {
        yield put(
            setOpenNotification({
                message: 'При удалении элемента произошла ошибка',
                severity: 'error',
            })
        );
    } finally {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADED));
    }
}
export function* deletedChoosedItemsRequest({
    payload,
}: DeleteChoosedItemsRequestActionInterface) {
    try {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADING));
        const choosedItems: ChoosedItem = yield select(
            (state: RootState) => state.gallery.choosed_items
        );
        yield call(galleryApi.deleteGalleryItems, { ...choosedItems });
        const currentPage: number = yield select(
            (state: RootState) => state.gallery.current_page
        );
        const {
            data: { data, total_pages },
        } = yield call(galleryApi.getGallleryItems, currentPage);
        //если после удаление на текущей странице нет элементов, то
        //загружаем последнюю доступную страницу
        if (Number(total_pages) < currentPage) {
            //в модальном окне модификация истории не требуется
            !payload.modal && payload.history.replace(`/gallery/page=${total_pages}`);
            yield put(fetchGalleryItems(total_pages));
        } else {
            yield put(setGalleryItems(data));
        }
        yield put(clearChoosedItems());
    } catch (error) {
        yield put(
            setOpenNotification({
                message: 'При удалении элементов произошла ошибка',
                severity: 'error',
            })
        );
    } finally {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADED));
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
        yield put(setEditGalleryItem(data));
        yield put(setChangeNotSaved(false));
        yield put(
            setOpenNotification({ message: 'Данные сохранены', severity: 'success' })
        );
    } catch (error) {
        console.log(error);
        yield put(
            setOpenNotification({
                message: 'При сохранении произошла ошибка',
                severity: 'error',
            })
        );
    } finally {
        yield put(setGalleryLoadingStatus(LoadingStatus.LOADED));
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

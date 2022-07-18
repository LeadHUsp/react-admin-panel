import {
    SetGalleryItemsActionInterface,
    SetLoadingStatusActionInterface,
    FetchGalleryItemsActionInterface,
    GalleryActionType,
    SetNewGalleryItemsActionInterface,
    DeleteUploadGalleryItemsActionInterface,
    ClearUploadGalleryItemsActionInterface,
    DeleteSingleGalleryItemRequestActionInterface,
    DeleteChoosedItemActionInterface,
    DeleteChoosedItemsRequestActionInterface,
    ClearChoosedItemsActionInterface,
    SetTotalPagesActionInterface,
    SetCurrentPageActionInterface,
    UploadChangeGalleryItemActionInterface,
    SetEditGalleryItem,
    SetChangeNotSavedActionInterface,
    SetGalleryOpenModalActionInterface,
} from './contracts/types';

import { GalleryState, GalleryItem } from './contracts/state';
import { UploadedFile } from 'components/DropLoader/DropLoader';
import { RouteComponentProps } from 'react-router-dom';
export const fetchGalleryItems = (
    payload?: number
): FetchGalleryItemsActionInterface => ({
    type: GalleryActionType.FETCH_GALLERY_ITEMS,
    payload,
});
export const setGalleryItems = (
    payload: Array<GalleryItem>
): SetGalleryItemsActionInterface => ({
    type: GalleryActionType.SET_GALLERY_ITEMS,
    payload,
});
export const setGalleryLoadingStatus = (
    payload: GalleryState['status']
): SetLoadingStatusActionInterface => ({
    type: GalleryActionType.SET_LOADING_STATE,
    payload,
});
export const setNewGalleryItems = (
    payload: UploadedFile[]
): SetNewGalleryItemsActionInterface => ({
    type: GalleryActionType.SET_NEW_GALLERY_ITEMS,
    payload,
});
export const deleteUploadGalleryItem = (
    payload: File
): DeleteUploadGalleryItemsActionInterface => ({
    type: GalleryActionType.DELETE_UPLOAD_GALLERY_ITEM,
    payload,
});
export const clearUploadItems = (): ClearUploadGalleryItemsActionInterface => ({
    type: GalleryActionType.CLEAR_UPLOAD_GALLERY_ITEMS,
});
export const deleteSingleGalleryItemRequest = (payload: {
    item: GalleryItem;
    history: RouteComponentProps['history'];
    modal: boolean;
}): DeleteSingleGalleryItemRequestActionInterface => ({
    type: GalleryActionType.DELETE_SINGLE_GALLERY_ITEM,
    payload,
});
export const setChoosedItems = (payload: GalleryItem) => ({
    type: GalleryActionType.SET_CHOOSED_ITEMS,
    payload,
});
export const setChoosedSingleItem = (payload: GalleryItem) => ({
    type: GalleryActionType.SET_CHOOSED_SINGLE_ITEM,
    payload,
});
export const deleteChoosedItem = (
    payload: GalleryItem
): DeleteChoosedItemActionInterface => ({
    type: GalleryActionType.DELETE_CHOOSED_ITEM,
    payload,
});
export const deleteChoosedItemsRequest = (payload: {
    history: RouteComponentProps['history'];
    modal: boolean;
}): DeleteChoosedItemsRequestActionInterface => ({
    type: GalleryActionType.DELETE_CHOOSED_ITEMS_REQUEST,
    payload,
});
export const clearChoosedItems = (): ClearChoosedItemsActionInterface => ({
    type: GalleryActionType.CLEAR_CHOOSED_ITEMS,
});
export const setTotalPages = (payload: number): SetTotalPagesActionInterface => ({
    type: GalleryActionType.SET_TOTAL_PAGES,
    payload,
});
export const setCurrentPage = (payload: number): SetCurrentPageActionInterface => ({
    type: GalleryActionType.SET_CURRENT_PAGE,
    payload,
});
export const fetchSingleGalleryItem = (payload: string) => ({
    type: GalleryActionType.FETCH_SINGLE_GALLERY_ITEM,
    payload,
});
export const setEditGalleryItem = (payload: GalleryItem): SetEditGalleryItem => ({
    type: GalleryActionType.SET_EDIT_GALLERY_ITEM,
    payload,
});
export const uploadChangeGalleryItem = (payload: {
    id: string;
    title: string;
    alt: string;
}): UploadChangeGalleryItemActionInterface => ({
    type: GalleryActionType.UPLOAD_CHANGE_GALLERY_ITEM,
    payload,
});
export const setChangeNotSaved = (
    payload: boolean
): SetChangeNotSavedActionInterface => ({
    type: GalleryActionType.SET_CHANGE_NOT_SAVE,
    payload,
});
export const setOpenGalleryModal = (
    payload: boolean
): SetGalleryOpenModalActionInterface => ({
    type: GalleryActionType.SET_GALLERY_OPEN_MODAL,
    payload,
});

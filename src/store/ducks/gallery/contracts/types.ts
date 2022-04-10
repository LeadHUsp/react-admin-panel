import { UploadedFile } from 'components/DropLoader/DropLoader';
import { Action } from 'redux';
import { LoadingStatus } from 'store/types';
import { GalleryItem, ChoosedItem } from './state';

export enum GalleryActionType {
    FETCH_GALLERY_ITEMS = 'gallery/FETCH_GALLERY_ITEMS',
    SET_GALLERY_ITEMS = 'gallery/SET_GALLERY_ITEMS',
    SET_LOADING_STATE = 'gallery/SET_LOADING_STATE',
    SET_NEW_GALLERY_ITEMS = 'gallery/SET_NEW_GALLERY_ITEMS',
    DELETE_UPLOAD_GALLERY_ITEM = 'gallery/DELETE_UPLOAD_GALLERY_ITEM',
    CLEAR_UPLOAD_GALLERY_ITEMS = 'gallery/CLEAR_UPLOAD_GALLERY_ITEMS',
    DELETE_SINGLE_GALLERY_ITEM = 'gallery/DELETE_SINGLE_GALLERY_ITEM',
    SET_CHOOSED_ITEMS = 'gallery/SET_CHOOSED_ITEMS',
    SET_CHOOSED_SINGLE_ITEM = 'gallery/SET_CHOOSED_SINGLE_ITEM',
    DELETE_CHOOSED_ITEM = 'gallery/DELETE_CHOOSED_ITEM',
    DELETE_CHOOSED_ITEMS_REQUEST = 'gallery/DELETE_CHOOSED_ITEMS_REQUEST',
    CLEAR_CHOOSED_ITEMS = 'gallery/CLEAR_CHOOSED_ITEMS',
    SET_TOTAL_PAGES = 'gallery/SET_TOTAL_PAGES',
    SET_CURRENT_PAGE = 'gallery/SET_CURRENT_PAGE',
    FETCH_SINGLE_GALLERY_ITEM = 'gallery/FETCH_SINGLE_GALLERY_ITEM',
    SET_EDIT_GALLERY_ITEM = 'gallery/SET_EDIT_GALLERY_ITEM',
    UPLOAD_CHANGE_GALLERY_ITEM = 'gallery/UPLOAD_CHANGE_GALLERY_ITEM',
    SET_CHANGE_NOT_SAVE = 'gallery/SET_CHANGE_NOT_SAVE',
    SET_GALLERY_OPEN_MODAL = 'gallery/SET_GALLERY_OPEN_MODAL',
}

export interface FetchGalleryItemsActionInterface extends Action {
    type: GalleryActionType.FETCH_GALLERY_ITEMS;
    payload?: number;
}
export interface SetLoadingStatusActionInterface extends Action {
    type: GalleryActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}
export interface SetGalleryItemsActionInterface extends Action {
    type: GalleryActionType.SET_GALLERY_ITEMS;
    payload: Array<GalleryItem>;
}
export interface SetNewGalleryItemsActionInterface extends Action {
    type: GalleryActionType.SET_NEW_GALLERY_ITEMS;
    payload: UploadedFile[];
}
export interface DeleteUploadGalleryItemsActionInterface extends Action {
    type: GalleryActionType.DELETE_UPLOAD_GALLERY_ITEM;
    payload: File;
}
export interface ClearUploadGalleryItemsActionInterface extends Action {
    type: GalleryActionType.CLEAR_UPLOAD_GALLERY_ITEMS;
}
export interface DeleteSingleGalleryItemRequestActionInterface extends Action {
    type: GalleryActionType.DELETE_SINGLE_GALLERY_ITEM;
    payload: GalleryItem;
}
export interface SetChoosedItemsActionInterface extends Action {
    type: GalleryActionType.SET_CHOOSED_ITEMS;
    payload: GalleryItem;
}
export interface SetChoosedSingleItem extends Action {
    type: GalleryActionType.SET_CHOOSED_SINGLE_ITEM;
    payload: GalleryItem;
}
export interface DeleteChoosedItemActionInterface extends Action {
    type: GalleryActionType.DELETE_CHOOSED_ITEM;
    payload: ChoosedItem;
}
export interface DeleteChoosedItemsRequestActionInterface extends Action {
    type: GalleryActionType.DELETE_CHOOSED_ITEMS_REQUEST;
}
export interface ClearChoosedItemsActionInterface extends Action {
    type: GalleryActionType.CLEAR_CHOOSED_ITEMS;
}
export interface SetTotalPagesActionInterface extends Action {
    type: GalleryActionType.SET_TOTAL_PAGES;
    payload: number;
}
export interface SetCurrentPageActionInterface extends Action {
    type: GalleryActionType.SET_CURRENT_PAGE;
    payload: number | null;
}
export interface FetchSingleGalleryItemActionInterface extends Action {
    type: GalleryActionType.FETCH_SINGLE_GALLERY_ITEM;
    payload: string;
}
export interface SetEditGalleryItem extends Action {
    type: GalleryActionType.SET_EDIT_GALLERY_ITEM;
    payload: GalleryItem;
}
export interface UploadChangeGalleryItemActionInterface extends Action {
    type: GalleryActionType.UPLOAD_CHANGE_GALLERY_ITEM;
    payload: {
        id: string;
        title: string;
        alt: string;
    };
}
export interface SetChangeNotSavedActionInterface extends Action {
    type: GalleryActionType.SET_CHANGE_NOT_SAVE;
    payload: boolean;
}
export interface SetGalleryOpenModalActionInterface extends Action {
    type: GalleryActionType.SET_GALLERY_OPEN_MODAL;
    payload: boolean;
}

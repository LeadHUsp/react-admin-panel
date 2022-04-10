import { Action } from 'redux';
import { GalleryItem } from 'store/ducks/gallery/contracts/state';
import { LoadingStatus } from '../../../types';

import { Category, newCategory } from './state';

export enum CategoryActionType {
    FETCH_CATEGORIES_DATA = 'category/FETCH_CATEGORIES_DATA',
    DELETE_SINGLE_CATEGORY_REQUEST = 'category/DELETE_SINGLE_CATEGORY_REQUEST',
    SET_CATEGORIES_DATA = 'category/SET_CATEGORIES_DATA',
    SET_FLAT_ARRAY_OF_CATEGORIES = 'category/SET_FLAT_ARRAY_OF_CATEGORIES',
    FETCH_CATEGORIES_DATA_SUCCESS = 'category/FETCH_CATEGORIES_DATA_SUCCESS',
    FETCH_CATEGORIES_DATA_FAIL = 'category/FETCH_CATEGORIES_DATA_FAIL',
    SET_LOADING_STATE = 'category/SET_LOADING_STATE',
    SEND_NEW_CATEGORY = 'category/SEND_NEW_CATEGORY',
    SET_NEW_CATEGORY_PARENT_ID = 'category/SET_NEW_CATEGORY_PARENT_ID',
    SET_NEW_CATEGORY_DATA = 'category/SET_NEW_CATEGORY_DATA',
    SET_NEW_CATEGORY_IMAGE = 'category/SET_NEW_CATEGORY_IMAGE',
    SET_NEW_CATEGORY_THUMB = 'category/SET_NEW_CATEGORY_THUMB',
}

export interface FetchCategoriesActionInterface extends Action<CategoryActionType> {
    type: CategoryActionType.FETCH_CATEGORIES_DATA;
}

export interface SetCategoriesActionInterface extends Action<CategoryActionType> {
    type: CategoryActionType.SET_CATEGORIES_DATA;
    payload: Array<Category>;
}
export interface SetCategoriesLoadingStatus extends Action<CategoryActionType> {
    type: CategoryActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetNewCategoryData extends Action<CategoryActionType> {
    type: CategoryActionType.SET_NEW_CATEGORY_PARENT_ID;
    payload: newCategory;
}
export interface SetNewCategoryImageActionInterface extends Action {
    type: CategoryActionType.SET_NEW_CATEGORY_IMAGE;
    payload: string;
}
export interface SetNewCategoryThumbActionInterface extends Action {
    type: CategoryActionType.SET_NEW_CATEGORY_THUMB;
    payload: GalleryItem | null;
}
export interface DeleteSingleCategoryRequest extends Action {
    type: CategoryActionType.DELETE_SINGLE_CATEGORY_REQUEST;
    payload: string;
}

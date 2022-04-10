import {
    SetCategoriesActionInterface,
    CategoryActionType,
    SetCategoriesLoadingStatus,
    FetchCategoriesActionInterface,
    SetNewCategoryImageActionInterface,
    SetNewCategoryThumbActionInterface,
    DeleteSingleCategoryRequest,
} from './contracts/types';

import { Category, CategoryState, newCategory } from './contracts/state';
import { GalleryItem } from '../gallery/contracts/state';

export const fetchCategoriesData = (): FetchCategoriesActionInterface => ({
    type: CategoryActionType.FETCH_CATEGORIES_DATA,
});

export const setCategoriesData = (
    payload: Array<Category>
): SetCategoriesActionInterface => ({
    type: CategoryActionType.SET_CATEGORIES_DATA,
    payload,
});
export const setCategoriesLoadingStatus = (
    payload: CategoryState['status']
): SetCategoriesLoadingStatus => ({
    type: CategoryActionType.SET_LOADING_STATE,
    payload,
});

export const setNewCategoryData = (payload: newCategory) => ({
    type: CategoryActionType.SET_NEW_CATEGORY_DATA,
    payload,
});
export const setNewCategoryImage = (
    payload: string
): SetNewCategoryImageActionInterface => ({
    type: CategoryActionType.SET_NEW_CATEGORY_IMAGE,
    payload,
});
export const setNewCategoryThumb = (
    payload: GalleryItem | null
): SetNewCategoryThumbActionInterface => ({
    type: CategoryActionType.SET_NEW_CATEGORY_THUMB,
    payload,
});
export const deleteSingleCategoryRequest = (
    payload: string
): DeleteSingleCategoryRequest => ({
    type: CategoryActionType.DELETE_SINGLE_CATEGORY_REQUEST,
    payload,
});

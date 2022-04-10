import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { CategoryState } from './contracts/state';
import { CategoryActionType } from './contracts/types';
import formatedDepthsCategories from 'helpers/arrayFormating';

const initialState: CategoryState = {
    categories: [],
    flatCategoriesArray: [],
    newCategory: {
        name: '',
        slug: '',
        parent_id: [],
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        content: '',
        category_image: null,
    },
    newCategoryThumb: null,
    categoriesNames: null,
    status: LoadingStatus.NEVER,
};

export const categoryReducer = produce(
    (draft: Draft<CategoryState>, { type, payload }) => {
        switch (type) {
            case CategoryActionType.SET_LOADING_STATE:
                draft.status = payload;
                break;
            case CategoryActionType.SET_CATEGORIES_DATA:
                draft.categories = payload;
                draft.status = LoadingStatus.SUCCESS;
                draft.categoriesNames = formatedDepthsCategories(payload);
                break;
            case CategoryActionType.SET_FLAT_ARRAY_OF_CATEGORIES:
                draft.flatCategoriesArray = payload;
                break;
            case CategoryActionType.SET_NEW_CATEGORY_PARENT_ID:
                draft.newCategory.parent_id = payload;
                break;
            case CategoryActionType.SET_NEW_CATEGORY_DATA:
                draft.newCategory = Object.assign(draft.newCategory, payload);
                break;
            case CategoryActionType.SET_NEW_CATEGORY_IMAGE:
                draft.newCategory.category_image = payload;
                break;
            case CategoryActionType.SET_NEW_CATEGORY_THUMB:
                draft.newCategoryThumb = payload;
                break;
            default:
                break;
        }
    },
    initialState
);

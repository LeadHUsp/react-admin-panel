import { GalleryItem } from 'store/ducks/gallery/contracts/state';
import { LoadingStatus } from '../../../types';

export interface Category {
    [index: string]: any;
    name: string;
    slug: string;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    long_description?: string;
    category_image?: string | null;
    children?: Array<FetchedCategoryInterface>;
}
export interface FetchedCategoryInterface extends Category {
    _id: string;
    parent_id?: string | null;
    createdAt: string;
    updatedAt: string;
    __v: string;
}
export interface newCategory extends Category {
    parent_id: Category[] | null;
}

export interface FilterParam {
    [index: string]: any;
    _id?: string | null;
    name: string;
    values: Array<string> | string;
}
export interface CategoryState {
    categories: Array<FetchedCategoryInterface>;
    flatCategoriesArray: Array<FetchedCategoryInterface>;
    newCategory: newCategory;
    newCategoryThumb: GalleryItem | null;
    status: LoadingStatus;
    categoriesNames: {
        [index: string]: Category;
    } | null;
}

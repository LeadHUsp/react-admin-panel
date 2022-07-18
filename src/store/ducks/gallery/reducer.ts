import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { GalleryState } from './contracts/state';
import { GalleryActionType } from './contracts/types';

const initialState: GalleryState = {
    gallery_items: [],
    status: LoadingStatus.NEVER,
    new_gallery_items: [],
    choosed_items: {},
    total_pages: 1,
    edit_gallery_item: {
        _id: '',
        name: '',
        alt: '',
        title: '',
        size: '',
        width: '',
        height: '',
        createdAt: '',
        updatedAt: '',
    },
    change_not_saved: false,
    open_gallery_modal: false,
    current_page: null,
};
export const galleryReducer = produce((draft: Draft<GalleryState>, action) => {
    switch (action.type) {
        case GalleryActionType.SET_GALLERY_ITEMS:
            draft.gallery_items = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;
        case GalleryActionType.SET_NEW_GALLERY_ITEMS:
            draft.new_gallery_items = [...draft.new_gallery_items, ...action.payload];
            break;
        case GalleryActionType.DELETE_UPLOAD_GALLERY_ITEM:
            draft.new_gallery_items = draft.new_gallery_items.filter(
                (item) => item.file !== action.payload
            );
            break;
        case GalleryActionType.CLEAR_UPLOAD_GALLERY_ITEMS:
            draft.new_gallery_items = [];
            break;
        case GalleryActionType.SET_CHOOSED_ITEMS:
            draft.choosed_items[action.payload._id] = action.payload;
            break;
        case GalleryActionType.SET_CHOOSED_SINGLE_ITEM:
            draft.choosed_items = Object.assign(
                {},
                { [action.payload._id]: action.payload }
            );
            break;
        case GalleryActionType.CLEAR_CHOOSED_ITEMS:
            draft.choosed_items = {};
            break;
        case GalleryActionType.DELETE_CHOOSED_ITEM:
            delete draft.choosed_items[action.payload._id];
            break;
        case GalleryActionType.SET_TOTAL_PAGES:
            draft.total_pages = action.payload;
            break;
        case GalleryActionType.SET_CURRENT_PAGE:
            draft.current_page = action.payload;
            break;
        case GalleryActionType.SET_EDIT_GALLERY_ITEM:
            draft.edit_gallery_item = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;
        case GalleryActionType.SET_CHANGE_NOT_SAVE:
            draft.change_not_saved = action.payload;
            break;
        case GalleryActionType.SET_GALLERY_OPEN_MODAL:
            draft.open_gallery_modal = action.payload;
            break;
        case GalleryActionType.SET_LOADING_STATE:
            draft.status = action.payload;
            break;
        default:
            break;
    }
}, initialState);

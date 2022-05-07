import { combineReducers } from 'redux';
import { AttributeReducer } from './ducks/attribute/reducer';
import { authReducer } from './ducks/auth/reducer';
import { categoryReducer } from './ducks/category/reducer';
import { galleryReducer } from './ducks/gallery/reducer';
import { NotificationReducer } from './ducks/notification/reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoryReducer,
    gallery: galleryReducer,
    attribute: AttributeReducer,
    notification: NotificationReducer,
});

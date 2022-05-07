import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './rootReducer';
import rootSaga from './saga';
import { AuthState } from './ducks/auth/contracts/state';
import { CategoryState } from './ducks/category/contracts/state';
import { GalleryState } from './ducks/gallery/contracts/state';
import { AttributeState } from './ducks/attribute/contracts/state';
import { INotificationState } from './ducks/notification/state';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export interface RootState {
    auth: AuthState;
    categories: CategoryState;
    gallery: GalleryState;
    attribute: AttributeState;
    notification: INotificationState;
}

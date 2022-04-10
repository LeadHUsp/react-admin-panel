import { all } from 'redux-saga/effects';
import { authSaga } from './ducks/auth/sagas';
import { categoriesSaga } from './ducks/category/sagas';
import { gallerySaga } from './ducks/gallery/sagas';
import { attributeSaga } from './ducks/attribute/sagas';

export default function* rootSaga() {
    yield all([authSaga(), categoriesSaga(), gallerySaga(), attributeSaga()]);
}

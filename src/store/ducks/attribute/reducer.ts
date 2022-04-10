import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { AttributeState } from './contracts/state';
import { AttributeActionType } from './contracts/types';

const initialState: AttributeState = {
    attr_group: null,
    current_page: 1,
    total_pages: 1,
    open_edit_panel: false,
    status: LoadingStatus.NEVER,
};

export const AttributeReducer = produce(
    (draft: Draft<AttributeState>, { type, payload }) => {
        switch (type) {
            case AttributeActionType.SET_ATTRIBUTE_LOADING_STATUS:
                draft.status = payload;
                break;
            case AttributeActionType.SET_ATTRIBUTE_GROUP_DATA:
                draft.attr_group = payload;
                break;
            case AttributeActionType.SET_OPEN_ATTRIBUTE_EDIT_PANEL:
                draft.open_edit_panel = payload;
                break;
            case AttributeActionType.SET_TOTAL_PAGES:
                draft.total_pages = payload;
                break;
            default:
                break;
        }
    },
    initialState
);

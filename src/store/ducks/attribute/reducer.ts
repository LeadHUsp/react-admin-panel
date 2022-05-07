import produce, { Draft } from 'immer';
import { LoadingStatus } from '../../types';
import { AttributeState } from './contracts/state';
import { AttributeActionType } from './contracts/types';

const initialState: AttributeState = {
    attr_group: [],
    attr_group_ids: [],
    current_page: 1,
    total_pages: 1,
    choosed_items: [],
    delete_single_item_id: null,
    open_confirm_dialog: false,
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
            case AttributeActionType.SET_ATTRIBUTE_GROUP_IDS:
                draft.attr_group_ids = payload;
                break;
            case AttributeActionType.SET_TOTAL_PAGES:
                draft.total_pages = payload;
                break;
            case AttributeActionType.SET_CHOOSED_ITEMS:
                draft.choosed_items = payload;
                break;
            case AttributeActionType.CONFIRM_DELETE_SINGLE:
                draft.open_confirm_dialog = true;
                draft.delete_single_item_id = payload;
                break;
            case AttributeActionType.CLOSE_CONFIRM_DIALOG:
                draft.open_confirm_dialog = false;
                draft.delete_single_item_id = null;
                break;
            default:
                break;
        }
    },
    initialState
);

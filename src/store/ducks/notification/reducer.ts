import produce, { Draft } from 'immer';

import { INotificationState } from './state';
import { NotificationActionType } from './types';

const initialState: INotificationState = {
    isOpen: false,
    message: '',
    autoHideDuration: 6000,
    severity: 'success',
};

export const NotificationReducer = produce(
    (draft: Draft<INotificationState>, { type, payload }) => {
        switch (type) {
            case NotificationActionType.SET_OPEN_NOTIFICATION:
                draft.isOpen = true;
                draft.message = payload.message;
                draft.autoHideDuration = payload.autoHideDuration || 6000;
                draft.severity = payload.severity;
                break;
            case NotificationActionType.SET_CLOSE_NOTIFICATION:
                draft.isOpen = false;
                break;

            default:
                break;
        }
    },
    initialState
);

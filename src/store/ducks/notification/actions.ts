import { INotificationState } from './state';
import {
    NotificationActionType,
    ISetOpenNotification,
    ISetCloseNotification,
} from './types';

export const setOpenNotification = (
    payload: INotificationState
): ISetOpenNotification => ({
    type: NotificationActionType.SET_OPEN_NOTIFICATION,
    payload,
});
export const setCloseNotification = (): ISetCloseNotification => ({
    type: NotificationActionType.SET_CLOSE_NOTIFICATION,
});

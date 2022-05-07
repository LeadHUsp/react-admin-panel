import { Action } from 'redux';
import { INotificationState } from './state';

export enum NotificationActionType {
    SET_OPEN_NOTIFICATION = 'notification/SET_OPEN_NOTIFICATION',
    SET_CLOSE_NOTIFICATION = 'notification/SET_CLOSE_NOTIFICATION',
}
export interface ISetOpenNotification extends Action<NotificationActionType> {
    type: NotificationActionType.SET_OPEN_NOTIFICATION;
    payload: INotificationState;
}
export interface ISetCloseNotification extends Action<NotificationActionType> {
    type: NotificationActionType.SET_CLOSE_NOTIFICATION;
}

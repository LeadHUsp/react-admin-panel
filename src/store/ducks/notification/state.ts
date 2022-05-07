export interface INotificationState {
    isOpen?: boolean;
    message: string;
    autoHideDuration?: number | 6000;
    severity: 'success' | 'info' | 'warning' | 'error';
}

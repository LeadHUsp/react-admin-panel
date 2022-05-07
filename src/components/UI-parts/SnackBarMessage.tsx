import React, { useCallback } from 'react';
//mui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//other
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks/redux';
import { setCloseNotification } from 'store/ducks/notification/actions';

export const SnackBarMessage: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, message, autoHideDuration, severity } = useAppSelector(
        (state) => state.notification
    );
    const handleClose = useCallback(() => {
        dispatch(setCloseNotification());
    }, [dispatch]);
    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

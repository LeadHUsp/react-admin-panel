import React from 'react';
//mui
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface ISnackBarMessage {
    open: boolean;
    handleClose: () => void;
    children: React.ReactChild | React.ReactChildren;
}

export const SnackBarMessage: React.FC<ISnackBarMessage> = ({
    open,
    handleClose,
    children,
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity="success">
                {children}
            </MuiAlert>
        </Snackbar>
    );
};

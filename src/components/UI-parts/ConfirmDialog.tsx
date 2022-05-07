import React from 'react';
//mui
import { Theme, WithStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

interface DialogTitleProps extends WithStyles<typeof styles> {
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
interface IConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    modalTitle?: string;
    children?: React.ReactNode;
}

const ConfirmDialogComponent: React.FC<IConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    modalTitle,
    children,
}) => {
    return (
        <Dialog open={open}>
            <DialogTitle onClose={onClose}>{modalTitle}</DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} variant="contained">
                    Отменить
                </Button>
                <Button onClick={onConfirm} color="secondary" variant="contained">
                    Подтвердить
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export const СonfirmDialog = React.memo(ConfirmDialogComponent);

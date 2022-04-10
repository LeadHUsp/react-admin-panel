import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const appClasses = makeStyles((theme: Theme) => {
    const drawerWidth = 240;
    return createStyles({
        root: {
            display: 'flex',
        },

        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            width: '100%',
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            paddingTop: theme.spacing(11),
            minHeight: '100vh',
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
            width: '100%',
        },
    });
});
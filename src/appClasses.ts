import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const appClasses = makeStyles((theme: Theme) => {
    const drawerWidth = 240;
    return createStyles({
        root: {
            display: 'flex',
            height: '100%',
        },
        fullpage: {
            height: '100%',
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
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
            paddingTop: theme.spacing(11),
            minHeight: '100vh',
            overflowX: 'hidden',
            '@media screen and (min-width:600px)': {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
            },
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

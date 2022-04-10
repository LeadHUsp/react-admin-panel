import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { headerClasses } from './headerClasses';
import { selectIsAuth } from '../../store/ducks/auth/selectors';
import { fetchSignOut } from '../../store/ducks/auth/actions';
//components
import { SideBar } from '../SideBar/SideBar';

interface HeaderProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}
export const Header: React.FC<HeaderProps> = ({
    open,
    handleDrawerOpen,
    handleDrawerClose,
}): React.ReactElement => {
    const dispatch = useDispatch();
    const classes = headerClasses();
    const theme = useTheme();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector((state: RootState) => state.auth.userData);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        dispatch(fetchSignOut());
    };
    return (
        <>
            <AppBar
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar className={classes.tool_bar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" component={NavLink} to="/">
                        панель администратора
                    </Button>
                    <Button
                        startIcon={<PersonIcon />}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={handleClick}
                        className={classes.login_btn}>
                        {userData && userData.fullName}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                        <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {isAuth && (
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </div>
                    <Divider />
                    <SideBar />
                </Drawer>
            )}
        </>
    );
};

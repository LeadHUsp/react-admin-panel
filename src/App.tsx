import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

//redux
import { verifyUser } from 'store/ducks/auth/actions';
import { selectIsAuth } from 'store/ducks/auth/selectors';
//components
import { Header } from 'components/Header/Header';
import Home from 'screens/Home/Home';
import SignIn from 'screens/SigIn/SignIn';
import SignUp from 'screens/SignUp/SignUp';
import { PrivateRoute } from 'components/HOC/PrivateRouter';

import { appClasses } from 'appClasses';
import { SnackBarMessage } from 'components/UI-parts/SnackBarMessage';
const Categories = React.lazy(() => import('screens/Categories/Categories'));
const AddCategoryPanel = React.lazy(
    () => import('screens/Categories/AddCategoryPanel/AddCategoryPanel')
);
const Gallery = React.lazy(() => import('screens/Gallery/Gallery'));
const GalleryEdit = React.lazy(() => import('screens/Gallery/GalleryEdit'));
const AttributeScreen = React.lazy(() => import('screens/Attribute/Attribute'));
const EditAttribute = React.lazy(() => import('screens/Attribute/EditAttribute'));

export default function App() {
    const isAuth = useSelector(selectIsAuth);
    const classes = appClasses();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [locationAfterReload, setLocationAfterReload] = useState<{
        pathname: string;
        search: string;
    } | null>(null);
    const handleDrawerOpen = (): void => {
        setOpen(true);
    };
    const handleDrawerClose = (): void => {
        setOpen(false);
    };
    const location = useLocation();
    const token = window.localStorage.getItem('token');
    const authVerify = () => {
        if (!isAuth && token) {
            dispatch(verifyUser());
        }
    };
    // useEffect(() => {
    //     console.log(locationAfterReload);
    // });
    useEffect(() => {
        authVerify();
        setLocationAfterReload(location);
        //eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <SnackBarMessage />
            {isAuth && (
                <Header
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                    handleDrawerClose={handleDrawerClose}
                />
            )}
            <main
                className={clsx(isAuth ? classes.content : classes.fullpage, {
                    [classes.contentShift]: open,
                })}>
                <Switch>
                    {isAuth && (
                        <Redirect
                            exact
                            from="/signin"
                            to={{
                                pathname: locationAfterReload
                                    ? locationAfterReload.pathname
                                    : '/',
                                search: locationAfterReload
                                    ? locationAfterReload.search
                                    : '',
                                state: { from: location.pathname },
                            }}
                        />
                    )}
                    <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
                    <PrivateRoute exact path="/" component={Home} isAuth={isAuth} />
                    <PrivateRoute
                        exact
                        path="/categories"
                        component={Categories}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/categories/add-new-category"
                        component={AddCategoryPanel}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/categories/:editCategoryId"
                        component={AddCategoryPanel}
                        edit
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/attribute/page=:page"
                        component={AttributeScreen}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/attribute"
                        component={AttributeScreen}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/attribute/edit-attribute/:editAttrId"
                        component={EditAttribute}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/attribute/create-attribute"
                        component={EditAttribute}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/gallery"
                        component={Gallery}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/gallery/page=:page"
                        component={Gallery}
                        isAuth={isAuth}
                    />
                    <PrivateRoute
                        exact
                        path="/gallery/edit/:id"
                        component={GalleryEdit}
                        isAuth={isAuth}
                    />
                    {/*  <PrivateRoute exact path="/" component={Home} isAuth={isAuth} /> */}
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />{' '}
                </Switch>
            </main>
        </div>
    );
}

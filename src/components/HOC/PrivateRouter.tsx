import { ReactElement, Suspense } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

interface PrivateRouteProps extends RouteProps {
    component: any;
    isAuth: boolean;
    [key: string]: any;
}

export const PrivateRoute = (props: PrivateRouteProps): ReactElement => {
    const { component: Component, isAuth, ...rest } = props;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isAuth ? (
                    <Suspense
                        fallback={
                            <Backdrop open={true}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }>
                        <Component {...routeProps} {...rest} />
                    </Suspense>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: routeProps.location },
                        }}
                    />
                )
            }
        />
    );
};

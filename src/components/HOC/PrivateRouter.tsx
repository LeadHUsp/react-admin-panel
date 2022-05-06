import { ReactElement, Suspense } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { Preloader } from 'components/Preloader/Preloader';

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
                    <Suspense fallback={<Preloader open={true} />}>
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

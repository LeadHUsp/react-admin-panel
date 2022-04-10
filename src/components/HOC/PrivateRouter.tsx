import { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

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
                    <Component {...routeProps} {...rest} />
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

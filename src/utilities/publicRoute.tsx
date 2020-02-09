import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
} from 'react-router-dom';
import withAuthContext from "../context/AuthConsumer";
import {IAuthContext} from "../context/auth-context";

interface PublicRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    context: IAuthContext;
}

const PublicRoute = (props: PublicRouteProps) => {
    const { component: Component, context: IAuthContext, ...rest } = props;
    console.log("In public route, authenticated: ", props.context);
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                props.context.isAuthenticated ? (

                    <Component {...routeProps}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: routeProps.location }
                        }}
                    />
                )
            }
        />
    );
};

export default withAuthContext(PublicRoute);

import { Route, Redirect } from 'react-router-dom';

import { useAuthState } from '../hooks/use-auth-state';


const PrivateRoute = ({component: Component, ...rest}) => {
    const { isLoggedIn } = useAuthState();

    return (
        <Route {...rest} render={(props) => (
            isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
}

export { PrivateRoute };

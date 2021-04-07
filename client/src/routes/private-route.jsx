import { Route, Redirect } from 'react-router-dom';

import { isLoggedIn } from '../utils/auth';


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        isLoggedIn() === true
        ? <Component {...props} />
        : <Redirect to="/login" />
    )} />
);

export { PrivateRoute };

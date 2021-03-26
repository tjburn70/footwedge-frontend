import { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './private-route';
import { LoginPage, PlayerProfilePage } from '../pages/';

const AppRouter = memo(() => (
    <Switch>
        <Route component={LoginPage} exact={true} path="/login" />
        <PrivateRoute component={PlayerProfilePage} exact={true} path="/player-profile" />
    </Switch>
));

export { AppRouter };

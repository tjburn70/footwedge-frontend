import { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './private-route';
import { 
    LandingPage, 
    LoginPage, 
    PlayerProfilePage,
    PlayerRoundPage,
    RegistrationPage,
    ConfirmationPage,
} from '../pages/';

const AppRouter = memo(() => (
    <Switch>
        <Route component={LandingPage} exact={true} path="/" />
        <Route component={LoginPage} exact={true} path="/login" />
        <Route component={RegistrationPage} exact={true} path="/register" />
        <Route component={ConfirmationPage} exact={true} path="/confirm-user" />
        <PrivateRoute component={PlayerRoundPage} exact={true} path="/player-round/:playerRoundId" />
        <PrivateRoute component={PlayerProfilePage} exact={true} path="/player-profile" />
    </Switch>
));

export { AppRouter };

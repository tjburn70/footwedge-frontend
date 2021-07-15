import { NavBar } from './components';
import { AppRouter } from '../../routes/app-router';

import * as Styled from './styles';

const MainPage = () => {
    return (
        <Styled.Container>
            <NavBar />
            <AppRouter />
        </Styled.Container>
    );
}

export { MainPage };

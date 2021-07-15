import * as Styled from './styles';
import logo from './img/footwedge-logo-transparent-2x.svg';

const LandingPage = () => (
    <Styled.Container>
        <img src={logo} alt="Logo" />
        <Styled.Info>
            Record your golf rounds, stats, and track your handicap
        </Styled.Info>
    </Styled.Container>
);

export { LandingPage }

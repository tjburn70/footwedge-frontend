import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
    padding: 1rem;
`;

const Header = styled(Typography)``;

const CalculatedOn = styled(Typography)``;

const Handicap = styled(Typography)``;

const EnterRoundButton = styled(Button)`
    && {
        margin-top: 1rem;
    }
`;


export { Container, Header, CalculatedOn, Handicap, EnterRoundButton };

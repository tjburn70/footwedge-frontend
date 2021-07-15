import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';


const Header = styled(Typography)`
    color: #4682B4;
    margin-bottom: 1rem;
`;

const Row = styled(TableRow)`
    background-color: #FFEBCD;
`;

export { Header, Row };

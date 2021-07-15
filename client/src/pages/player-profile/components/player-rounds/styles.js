import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';

const Header = styled(Typography)`
    color: #4682B4;
    margin-bottom: 1rem;
`;

const TableHeader = styled(TableHead)`
    background-color: #B0C4DE;
`;

const TableHeaderCell = styled(TableCell)`
    color: #FFFFFF;
`;

export { Header, TableHeader, TableHeaderCell };
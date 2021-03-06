import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as Styled from './styles';

const StatCard = ({ statSummary }) => {
    return (
        <Styled.Container>
            <Styled.Header component="h2" variant="h5">Stat Summary</Styled.Header>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Stat</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Fairways 
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.fairways} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Greens In Regulation 
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.greens_in_regulation} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Total Putts 
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.putts} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Up And Downs 
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.up_and_downs} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Sand Saves
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.sand_saves} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Penalties
                        </TableCell>
                        <TableCell align="right">
                            {statSummary.penalties} 
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Styled.Container>
    );
}

export { StatCard };

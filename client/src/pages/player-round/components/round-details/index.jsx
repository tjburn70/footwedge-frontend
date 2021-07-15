import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import * as Styled from './styles';

const RoundDetails = ({ round }) => {
    console.log('round', round);

    return (
        <Styled.Container>
            <Styled.Header component="h2" variant="h5">Round Details</Styled.Header>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            Golf Club 
                        </TableCell>
                        <TableCell align="right">
                            {round.golf_club_name} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Golf Course 
                        </TableCell>
                        <TableCell align="right">
                            {round.golf_course_name} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Tee Box
                        </TableCell>
                        <TableCell align="right">
                            {round.tee_box_color} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Distance
                        </TableCell>
                        <TableCell align="right">
                            {round.tee_box_distance} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Course Rating
                        </TableCell>
                        <TableCell align="right">
                            {round.tee_box_course_rating} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Par
                        </TableCell>
                        <TableCell align="right">
                            {round.tee_box_par} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Score
                        </TableCell>
                        <TableCell align="right">
                            {round.gross_score} 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Played On 
                        </TableCell>
                        <TableCell align="right">
                            {round.played_on} 
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Styled.Container>
    );
}

export { RoundDetails };

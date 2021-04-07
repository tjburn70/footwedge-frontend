import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const PlayerRound = ({ round, golfCourse, teeBox }) => {
    const { push } = useHistory();
    const {id, played_on, towards_handicap, gross_score } = round;

    const goToPlayerRound = useCallback(() => {
        push(`/player-round/${id}`);
    }, [push, id])

    return (
        <TableRow key={id} hover={true} onClick={goToPlayerRound}>
            <TableCell>
                {id}
            </TableCell>
            <TableCell align="center">
                {played_on}
            </TableCell>
            <TableCell align="center">
                {gross_score}
            </TableCell>
            <TableCell align="center">
                {golfCourse.name}
            </TableCell>
            <TableCell align="center">
                {teeBox.distance}
            </TableCell>
            <TableCell align="center">
                {teeBox.course_rating}
            </TableCell>
            <TableCell align="center">
                {towards_handicap ? "Y" : "N"}
            </TableCell>
        </TableRow>
    )
}

export { PlayerRound };

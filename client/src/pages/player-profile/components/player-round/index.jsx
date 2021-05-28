import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const PlayerRound = ({ round }) => {
    const { push } = useHistory();
    const {
        golf_round_id,
        played_on,
        towards_handicap,
        gross_score,
        tee_box_distance,
        tee_box_course_rating, 
        golf_course_name 
    } = round;

    const goToPlayerRound = useCallback(() => {
        push(`/player-round/${golf_round_id}`);
    }, [push, golf_round_id])

    return (
        <TableRow key={golf_round_id} hover={true} onClick={goToPlayerRound}>
            <TableCell>
                {golf_round_id}
            </TableCell>
            <TableCell align="center">
                {played_on}
            </TableCell>
            <TableCell align="center">
                {gross_score}
            </TableCell>
            <TableCell align="center">
                {golf_course_name}
            </TableCell>
            <TableCell align="center">
                {tee_box_distance}
            </TableCell>
            <TableCell align="center">
                {tee_box_course_rating}
            </TableCell>
            <TableCell align="center">
                {towards_handicap ? "Y" : "N"}
            </TableCell>
        </TableRow>
    )
}

export { PlayerRound };

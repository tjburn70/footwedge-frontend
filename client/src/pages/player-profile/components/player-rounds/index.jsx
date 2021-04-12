import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { usePlayerRounds } from '../../../../data/hooks/use-player-rounds';
import { PlayerRound } from '../player-round';

const PlayerRounds = () => {
    const { data, isLoading } = usePlayerRounds();
    const rounds = data?.rounds;
    const golfCourseById = data?.golfCourseById;
    const teeBoxById = data?.teeBoxById;
    
    if (isLoading) {
        return <CircularProgress />
    }

    return (
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Past Rounds
            </Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Round Id</TableCell>
                            <TableCell align="center">Player On</TableCell>
                            <TableCell align="center">Score</TableCell>
                            <TableCell align="center">Golf Course</TableCell>
                            <TableCell align="center">Tee Box Distance</TableCell>
                            <TableCell align="center">Course Rating</TableCell>
                            <TableCell align="center">Towards Handicap</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rounds.map((round) => (
                            <PlayerRound 
                                key={round.id} 
                                round={round}
                                golfCourse={golfCourseById[round.golf_course_id]}
                                teeBox={teeBoxById[round.tee_box_id]}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export { PlayerRounds };

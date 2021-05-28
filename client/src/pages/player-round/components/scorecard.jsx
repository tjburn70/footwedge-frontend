import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { RoundStat } from './round-stat';
import { useTeeBox } from '../../../data/hooks/use-tee-boxes';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const getScore = (holes, statsByHoleId) => {
    let totalScore = 0;
    holes.forEach((hole) => {
        const holeStat = statsByHoleId[hole.hole_id];
        if (typeof holeStat !== 'undefined') {
            totalScore += holeStat.gross_score;
        }
    });

    return totalScore;
}

const Scorecard = ({ round, statsByHoleId }) => {
    const classes = useStyles();
  
    const golfCourseId = round.golf_course_id;
    const teeBoxId = round.tee_box_id;
    const { data: teeBox, isLoading } = useTeeBox(golfCourseId, teeBoxId);

    if (isLoading) {
        return <CircularProgress />
    }

    const frontNine = teeBox.front_nine_holes;
    const backNine = teeBox.back_nine_holes;
    const teeBoxInfo = teeBox.tee_box_info;
    const frontNinePar = teeBox.front_nine_par;
    const frontNineYardage = teeBox.front_nine_yardage;
    const backNinePar = teeBox.back_nine_par;
    const backNineYardage = teeBox.back_nine_yardage;
    const frontNineScore = getScore(frontNine, statsByHoleId);
    const backNineScore = getScore(backNine, statsByHoleId);
    const totalScore = frontNineScore + backNineScore;

    return (
        <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Scorecard
        </Typography>
        <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow key="hole_number">
                <TableCell>Hole</TableCell>
                {frontNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.hole_number}
                    </TableCell>
                ))}
                <TableCell>OUT</TableCell>
                {backNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.hole_number}
                    </TableCell>
                ))}
                <TableCell>IN</TableCell>
                <TableCell>TOT</TableCell>
            </TableRow>
            <TableRow key="distance">
                <TableCell>{teeBoxInfo}</TableCell>
                {frontNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.distance}
                    </TableCell>
                ))}
                <TableCell>{frontNineYardage}</TableCell>
                {backNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.distance}
                    </TableCell>
                ))}
                <TableCell>{backNineYardage}</TableCell>
                <TableCell>
                    {frontNineYardage + backNineYardage}
                </TableCell>
            </TableRow>
            <TableRow key="handicap">
                <TableCell>Handicap</TableCell>
                {frontNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.handicap}
                    </TableCell>
                ))}
                <TableCell></TableCell>
                {backNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.handicap}
                    </TableCell>
                ))}
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow key="par">
                <TableCell>Par</TableCell>
                {frontNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.par}
                    </TableCell>
                ))}
                <TableCell>{frontNinePar}</TableCell>
                {backNine.map((hole) => (
                    <TableCell key={hole.hole_number} align="center">
                        {hole.par}
                    </TableCell>
                ))}
                <TableCell>{backNinePar}</TableCell>
                <TableCell>
                    {frontNinePar + backNinePar}
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell>Score</TableCell>
                {frontNine.map((hole) => (
                    <TableCell key={hole.hole_number}>
                        <RoundStat
                            stat={statsByHoleId[hole.hole_id]}
                            roundId={round.golf_round_id}
                            holeId={hole.hole_id}
                            par={hole.par}
                        />
                    </TableCell>
                ))}
                <TableCell>{frontNineScore}</TableCell>
                {backNine.map((hole) => (
                    <TableCell key={hole.hole_number}>
                        <RoundStat
                            stat={statsByHoleId[hole.id]}
                            roundId={round.id}
                            holeId={hole.id}
                            par={hole.par}
                        />
                    </TableCell>
                ))}
                <TableCell>{backNineScore}</TableCell>
                <TableCell>{totalScore}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        </React.Fragment>
    );
}

export { Scorecard };

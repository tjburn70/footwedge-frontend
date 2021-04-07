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
import { useHoles } from '../../../data/hooks/use-golf-holes';
import { RoundStat } from './round-stat';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const getScore = (holes, statsByHoleId) => {
    let totalScore = 0;
    holes.forEach((hole) => {
        const holeStat = statsByHoleId[hole.id];
        if (typeof holeStat !== 'undefined') {
            totalScore += holeStat.gross_score;
        }
    });

    return totalScore;
}

const Scorecard = ({ round, statsByHoleId, teeBox, golfCourse }) => {
    const classes = useStyles();
    const golfCourseId = golfCourse.id;
    const teeBoxId = teeBox.id;
    const { data, isLoading } = useHoles(golfCourseId, teeBoxId);
    
    if (isLoading) {
        return <CircularProgress />
    }
    const teeBoxInfo = `${teeBox.tee_color} (${teeBox.course_rating} | ${teeBox.slope})`;
    const frontNine = data?.frontNine;
    const backNine = data?.backNine;
    let frontNinePar = 0;
    let frontNineYardage = 0;
    let backNinePar = 0;
    let backNineYardage = 0;
    frontNine.forEach((hole) => {
        frontNinePar += hole.par;
        frontNineYardage += hole.distance;
    });
    backNine.forEach((hole) => {
        backNinePar += hole.par;
        backNineYardage += hole.distance;
    });
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
                            stat={statsByHoleId[hole.id]}
                            roundId={round.id}
                            holeId={hole.id}
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

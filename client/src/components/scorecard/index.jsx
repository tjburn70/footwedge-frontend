import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RoundStat from './RoundStat';

import { useHoles } from '../../data/hooks/use-golf-holes';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Scorecard = ({ round, statsByHoleId, teeBox, golfCourse, dispatch }) => {
  const classes = useStyles();
  
  const golfCourseId = golfCourse.id;
  const teeBoxId = teeBox.id;
  const { data } = useHoles(golfCourseId, teeBoxId);
  const holes = data.result;
  

  const teeBoxInfo = () => {
    if (typeof teeBox === 'undefined') return;
    return `${teeBox.tee_color} (${teeBox.course_rating} | ${teeBox.slope})`;
  }

  const frontNine = holes.slice(0,9);
  const backNine = holes.slice(9);

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

  const frontNineScore = () => {
    let totalScore = 0;
    frontNine.forEach((hole) => {
      const holeStat = statsByHoleId[hole.holeId];
      if (typeof holeStat !== 'undefined') {
        let holeScore = holeStat.gross_score;
        totalScore += holeScore
      }
    })

    return totalScore;
  }

  const backNineScore = () => {
    let totalScore = 0;
    backNine.forEach((hole) => {
      const holeStat = statsByHoleId[hole.holeId];
      if (typeof holeStat !== 'undefined') {
        let holeScore = holeStat.gross_score;
        totalScore += holeScore
      }
    })

    return totalScore;
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow key="hole_number">
            <TableCell>Hole</TableCell>
            {frontNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
                {hole.holeNumber}
              </TableCell>
            ))}
            <TableCell>OUT</TableCell>
            {backNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
                {hole.holeNumber}
              </TableCell>
            ))}
            <TableCell>IN</TableCell>
            <TableCell>TOT</TableCell>
          </TableRow>
          <TableRow key="distance">
            <TableCell>{teeBoxInfo()}</TableCell>
            {frontNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
                {hole.distance}
              </TableCell>
            ))}
            <TableCell>{frontNineYardage}</TableCell>
            {backNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
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
              <TableCell key={hole.holeNumber} align="center">
                {hole.handicap}
              </TableCell>
            ))}
            <TableCell></TableCell>
            {backNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
                {hole.handicap}
              </TableCell>
            ))}
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow key="par">
            <TableCell>Par</TableCell>
            {frontNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
                {hole.par}
              </TableCell>
            ))}
            <TableCell>{frontNinePar}</TableCell>
            {backNine.map((hole) => (
              <TableCell key={hole.holeNumber} align="center">
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
              <TableCell key={hole.holeNumber}>
                <RoundStat
                  round={round}
                  stat={statsByHoleId[hole.holeId]}
                  holeId={hole.holeId}
                  par={hole.par}
                  dispatch={dispatch}
                />
              </TableCell>
            ))}
            <TableCell>{frontNineScore()}</TableCell>
            {backNine.map((hole) => (
              <TableCell key={hole.holeNumber}>
                <RoundStat
                  round={round}
                  stat={statsByHoleId[hole.holeId]}
                  holeId={hole.holeId}
                  par={hole.par}
                  dispatch={dispatch}
                />
              </TableCell>
            ))}
            <TableCell>{backNineScore()}</TableCell>
            <TableCell>{frontNineScore() + backNineScore()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { Scorecard };

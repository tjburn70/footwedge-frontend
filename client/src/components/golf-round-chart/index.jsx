import React from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { StatPreview } from '../stat-preview';
import { usePlayerRounds } from '../../data/hooks/use-player-rounds';
import { useStatSummary } from '../../data/hooks/use-stat-summary';

const summaryStub = () => ({
    fairways: "",
    greens_in_regulation: "",
    putts: "",
    up_and_downs: "",
    sand_saves: "",
});

const GolfRoundChart = () => {
    const { data: playerRounds, isLoading: playerRoundsIsLoading } = usePlayerRounds();
    const { data: statSummaryByRoundId, isLoading: statSummaryIsLoading } = useStatSummary();

    if (playerRoundsIsLoading || statSummaryIsLoading) {
        return <CircularProgress />
    }

    const roundIds = [...playerRounds?.roundIds];
    const data = roundIds.reverse().map((roundId) => {
        const round = playerRounds?.roundsById[roundId];
        const summary = statSummaryByRoundId[roundId];
        round.summary = summary ? summary : summaryStub();
        return round;
    });

    return (
        <React.Fragment>
            <Typography component="h2" variant="h5" color="primary" gutterBottom>
                Scores
            </Typography>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{top: 5, right: 30, left: 10, bottom: 5}}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="played_on"
                label={{value: "Played On", position: "bottom"}}
            />
            <YAxis
                label={{value: "Score", position: "insideLeft", angle: -90}}
                ticks={[70, 80, 90, 100]}
                domain={[70, 100]}
            />
            <Tooltip content={<StatPreview />} />
            <Line
                type="monotone"
                dataKey="gross_score"
                stroke="#8884d8"
                dot={true}
                activeDot={true}
            />
            </LineChart>
        </React.Fragment>
    );
}

export { GolfRoundChart };

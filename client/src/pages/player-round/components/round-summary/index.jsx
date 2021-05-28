import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { StatCard } from '../stat-card';
import { RoundScoreBreakdown } from '../round-score-breakdown';
import { useStatSummary } from '../../../../data/hooks/use-stat-summary';
import * as Styled from './styles';


const RoundSummary = ({ round }) => {
    const { data, isLoading } = useStatSummary();

    if (isLoading) {
        return <CircularProgress />
    }

    const statSummary = data[round.golf_round_id];

    if (!statSummary) {
        return null;
    }

    return (
        <Styled.Container>
            <Typography component="h2" variant="h4" color="primary" gutterBottom>
                Round Summary
            </Typography>
            <Styled.Content>
                <RoundScoreBreakdown statSummary={statSummary} />
                <StatCard statSummary={statSummary} />
            </Styled.Content>
        </Styled.Container>
    );

}

export { RoundSummary };

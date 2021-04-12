import React from 'react';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import * as Styled from './styles';
import { useActiveHandicap } from '../../../../data/hooks/use-handicap';
import { formatDate } from '../../../../utils/date';

const ENTER_ROUND_PATH = '/enter-round';

const HandicapCard = () => {
    const { data, isLoading } = useActiveHandicap();

    if (isLoading) {
        return <CircularProgress />
    }

    const handicapIndex = data?.result.index;
    const calculatedOnDate = data?.result.record_start_date;
    const calculatedOnDateFormatted = formatDate(calculatedOnDate, 'yyyy-MM-dd');
    const calculatedOn = `Calculated On: ${calculatedOnDateFormatted}`;

    return (
        <Styled.Container>
            <Styled.Header component="h2" variant="h6" color="primary" gutterBottom>
                Player Handicap:
            </Styled.Header>
            <Styled.Handicap component="p" variant="h4">
                {handicapIndex ? handicapIndex : "N/A"}
            </Styled.Handicap>
            <Styled.CalculatedOn color="textSecondary">
                {calculatedOn}
            </Styled.CalculatedOn>
            <Styled.EnterRoundButton
                variant="contained"
                color="primary"
                component={Link}
                to={ENTER_ROUND_PATH}
            >
                Enter a Past Round
            </Styled.EnterRoundButton>
        </Styled.Container>
    );
}

export { HandicapCard };

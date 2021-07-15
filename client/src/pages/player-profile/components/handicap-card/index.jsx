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

    const handicap = data?.data;
    const handicapIndex = handicap?.index ?? "N/A"
    const calculatedOnDate = handicap?.created_ts ?? null;

    return (
        <Styled.Container>
            <Styled.Handicap component="h2" variant="h5" gutterBottom>
                Handicap: {handicapIndex}
            </Styled.Handicap>
            {calculatedOnDate ? (
                <Styled.CalculatedOn>Last Calculated: {formatDate(calculatedOnDate, 'yyyy-MM-dd')}</Styled.CalculatedOn>
            ) : null}
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

import CircularProgress from '@material-ui/core/CircularProgress';

import { RoundDetails } from '../round-details';
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
            <RoundDetails round={round} />
            <RoundScoreBreakdown statSummary={statSummary} />
            <StatCard statSummary={statSummary} />
        </Styled.Container>
    );

}

export { RoundSummary };

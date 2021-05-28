import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { usePlayerRounds } from '../../data/hooks/use-player-rounds';
import { Scorecard } from './components/scorecard';
import { RoundSummary } from './components/round-summary';
import * as Styled from './styles';

const PlayerRoundPage = () => {
    const { data, isLoading } = usePlayerRounds();
    const { playerRoundId } = useParams();

    const playerRound = useMemo(() => data?.rounds.find((item) => item.golf_round_id === playerRoundId), [
        data,
        playerRoundId,
    ]);

    if (isLoading) {
        return <CircularProgress />
    }

    if (!playerRound) {
        return null
    }
    
    const statsByHoleId = playerRound?.stats.reduce((map, stat) => {
        map[stat.hole_id] = stat;
        return map;
    }, {});

    return (
        <Styled.Container>
            <RoundSummary round={playerRound}/>
            <Scorecard 
                round={playerRound}
                statsByHoleId={statsByHoleId}
            />
        </Styled.Container>
    );
}

export { PlayerRoundPage };

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { usePlayerRounds } from '../../data/hooks/use-player-rounds';
import { Scorecard } from './components/scorecard';

const PlayerRoundPage = () => {
    const { data, isLoading } = usePlayerRounds();
    const { playerRoundId } = useParams();
    const playerRoundIdNumber = Number(playerRoundId);

    const playerRound = useMemo(() => data?.rounds.find((item) => item.id === playerRoundIdNumber), [
        data,
        playerRoundIdNumber,
    ]);

    if (isLoading) {
        return <CircularProgress />
    }
    
    const golfCourse = data?.golfCourseById[playerRound.golf_course_id];
    const teeBox = data?.teeBoxById[playerRound.tee_box_id];
    const statsByHoleId = playerRound.stats.reduce((map, stat) => {
        map[stat.hole_id] = stat;
        return map;
    }, {});

    return (
        <Scorecard 
            golfCourse={golfCourse} 
            teeBox={teeBox} 
            round={playerRound}
            statsByHoleId={statsByHoleId}
        />
    );
}

export { PlayerRoundPage };

import { GolfRoundChart } from '../../components/golf-round-chart';
import { PlayerRounds, HandicapCard } from './components';
import * as Styled from './styles';

const PlayerProfilePage = () => (
    <Styled.Container>
        <Styled.Grid>
            <Styled.Chart>
                <GolfRoundChart />
            </Styled.Chart>
            <Styled.HandicapCard>
                <HandicapCard />
            </Styled.HandicapCard>
            <Styled.PlayerRounds>
                <PlayerRounds />
            </Styled.PlayerRounds>
        </Styled.Grid>  
    </Styled.Container>
)

export { PlayerProfilePage };

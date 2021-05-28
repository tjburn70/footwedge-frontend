import Typography from '@material-ui/core/Typography';
import * as Styled from './styles';

const StatCard = ({ statSummary }) => {

    return (
        <Styled.Container>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Fairways: {statSummary.fairways}
                </Typography>
            </Styled.Stat>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Greens: {statSummary.greens_in_regulation}
                </Typography>
            </Styled.Stat>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Putts: {statSummary.putts}
                </Typography>
            </Styled.Stat>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Up and Downs: {statSummary.up_and_downs}
                </Typography>
            </Styled.Stat>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Sandies: {statSummary.sand_saves}
                </Typography>
            </Styled.Stat>
            <Styled.Stat>
                <Typography variant="h5" color="primary">
                    Penalties: {statSummary.penalties}
                </Typography>
            </Styled.Stat>
        </Styled.Container>
    );
}

export { StatCard };

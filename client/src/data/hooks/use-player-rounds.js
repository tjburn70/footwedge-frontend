import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { footwedgeApi } from '../api-config';

const getPlayerRounds = async () => {
    const resp = await footwedgeApi.get('/golf-rounds/');
    return resp.data.data;
}

const getPlayerRoundDetails = async () => {
    const playerRounds = await getPlayerRounds();
    const roundIds = playerRounds.map(round => round.golf_round_id);
    const roundsById = playerRounds.reduce((map, obj) => (map[obj.golf_round_id] = obj, map), {});
    return { 
        rounds: playerRounds,
        roundIds: roundIds,
        roundsById: roundsById,
    }
}

const usePlayerRounds = () => {
    return useQuery('player-rounds', getPlayerRoundDetails);
}

const addPlayerRound = (newRound) => {
    footwedgeApi.post('/golf-rounds', newRound)
        .then((response) => {
            return response.data;
        }, (error) => {
            console.log(error);
            console.log(error.response.data);
        });
}

const usePlayerRoundMutation = () => {
    const client = useQueryClient();
    const history = useHistory();
    return useMutation(addPlayerRound, {
        onSuccess: () => {
            client.invalidateQueries('player-rounds');
            history.goBack();
        }
    });
}

const addPlayerStat = async (newStat) => {
    const roundId = newStat.golf_round_id;
    const path = `/golf-rounds/${roundId}/stat`;
    const resp = await footwedgeApi.put(path, newStat);
    return resp.data;
}

const usePlayerStatMutation = () => {
    const client = useQueryClient();
    return useMutation(addPlayerStat, {
        onSuccess: () => client.invalidateQueries('player-rounds'),
    });
}

export { usePlayerRounds, usePlayerRoundMutation, usePlayerStatMutation };

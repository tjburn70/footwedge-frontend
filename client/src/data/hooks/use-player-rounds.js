import { useQuery, useQueryClient, useMutation } from 'react-query';
import { normalize } from 'normalizr';
import { footwedgeApi } from '../api-config';
import { golfCourseSchema } from '../schemas';
import { buildGolfCourseIdsUrl } from '../../utils/url-utils';

const getPlayerRounds = async () => {
    const resp = await footwedgeApi.get('/golf-rounds/');
    return resp.data.result;
}

const getGolfCoursesByIds = async (golfCourseIds) => {
    const path = buildGolfCourseIdsUrl(golfCourseIds)
    const { data } = await footwedgeApi.get(path);
    const normalizedGolfCourses = normalize(
        {'golf_courses': data.result},
        {'golf_courses': [golfCourseSchema]}
    )
    return normalizedGolfCourses;
}

const getPlayerRoundDetails = async () => {
    const playerRounds = await getPlayerRounds();
    const golfCourseIds = playerRounds.map(round => round.golf_course_id);
    const normalizedGolfCourses = await getGolfCoursesByIds(golfCourseIds);
    return { 
        rounds: playerRounds,
        golfCourseById: normalizedGolfCourses.entities.golf_courses,
        teeBoxById: normalizedGolfCourses.entities.tee_boxes,
    }
}

const usePlayerRounds = () => {
    return useQuery('player-rounds', getPlayerRoundDetails);
}

const addPlayerRound = async (newRound) => {
    const resp = await footwedgeApi.post('/golf-rounds', newRound);
    return resp.data;
}

const usePlayerRoundMutation = () => {
    const client = useQueryClient();
    return useMutation(addPlayerRound, {
        onSuccess: () => {
            client.invalidateQueries('player-rounds');
        }
    });
}

const addPlayerStat = async (newStat) => {
    const roundId = newStat.golf_round_id;
    const path = `/golf-rounds/${roundId}/golf-round-stats`;
    const body = {
        round_stats: [newStat],
    }
    const resp = await footwedgeApi.post(path, body);
    return resp.data;
}

const usePlayerStatMutation = () => {
    const client = useQueryClient();
    return useMutation(addPlayerStat, {
        onSuccess: () => client.invalidateQueries('player-rounds'),
    });
}

export { usePlayerRounds, usePlayerRoundMutation, usePlayerStatMutation };

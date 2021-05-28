import { useQuery } from 'react-query';
import { footwedgeApi } from '../api-config';

const getActiveHandicap = async () => {
    const { data } = await footwedgeApi.get('/handicaps/active');
    return data;
}

const useActiveHandicap = () => {
    return useQuery('active-handicap', getActiveHandicap);
}

export { useActiveHandicap }

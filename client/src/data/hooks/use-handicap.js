import { useQuery } from 'react-query';
import { footwedgeApi } from '../api-config';

const getHandicap = async () => {
    const { data } = await footwedgeApi.get('/handicaps/');
    return data;
}

const useActiveHandicap = () => {
    return useQuery('active-handicap', getHandicap);
}

export { useActiveHandicap }

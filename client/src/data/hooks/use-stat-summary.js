import { useQuery } from 'react-query';
import { footwedgeApi } from '../api-config';

const getStatSummaryByRoundId = async () => {
    const resp = await footwedgeApi.get('/golf-rounds/aggregate-stats');
    return resp.data.data;
}

const useStatSummary = () => {
    return useQuery('stat-summary', getStatSummaryByRoundId);
}

export { useStatSummary };

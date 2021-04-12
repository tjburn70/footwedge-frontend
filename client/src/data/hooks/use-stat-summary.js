import { useQuery } from 'react-query';
import { footwedgeApi } from '../api-config';

const getStatSummaryByRoundId = async () => {
    const resp = await footwedgeApi.get('/golf-rounds/golf-round-stats/summary');
    return resp.data.result;
}

const useStatSummary = () => {
    return useQuery('stat-summary', getStatSummaryByRoundId);
}

export { useStatSummary };

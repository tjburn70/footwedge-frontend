import { useQuery } from 'react-query'; 

import { footwedgeApi } from '../api-config';

const getTeeBoxByGolfCourseId = async (golfCourseId) => {
    const path = `/golf-courses/${golfCourseId}/tee-boxes`;
    const { data } = await footwedgeApi.get(path);
    return data.data;
}

const useTeeBoxes = (golfCourseId) => {
    return useQuery(
        ['tee-boxes', golfCourseId],
        async () => getTeeBoxByGolfCourseId(golfCourseId),
        { enabled: !!golfCourseId }
    );
}

export { useTeeBoxes };

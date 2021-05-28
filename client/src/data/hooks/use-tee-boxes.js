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

const getTeeBoxById = async (golfCourseId, teeBoxId) => {
    const path = `/golf-courses/${golfCourseId}/tee-boxes/${teeBoxId}`;
    const { data } = await footwedgeApi.get(path);
    return data.data;
}

const useTeeBox = (golfCourseId, teeBoxId) => {
    return useQuery(
        ['tee-box', golfCourseId, teeBoxId],
        async () => getTeeBoxById(golfCourseId, teeBoxId),
        { enabled: !!golfCourseId && !!teeBoxId}
    );
}

export { useTeeBoxes, useTeeBox };

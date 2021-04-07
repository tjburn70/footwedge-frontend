import { useQuery } from 'react-query';
import { footwedgeApi } from '../api-config';

const getHolesByGolfCourseAndTeeBox = async (golfCourseId, teeBoxId) => {
    const path = `/golf-courses/${golfCourseId}/tee-boxes/${teeBoxId}/holes`
    const { data } = await footwedgeApi.get(path);
    const holes = data.result;
    const frontNine = holes.slice(0,9);
    const backNine = holes.slice(9);
    return {
        frontNine: frontNine,
        backNine: backNine,
    };
}

const useHoles = (golfCourseId, teeBoxId) => {
    return useQuery(
        ['holes', golfCourseId, teeBoxId], 
        async () => getHolesByGolfCourseAndTeeBox(golfCourseId, teeBoxId),
    )
}

export { useHoles }

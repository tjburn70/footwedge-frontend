import { useQuery } from 'react-query'; 

import { footwedgeApi } from '../api-config';
import { buildGolfCourseIdsUrl } from '../../utils/url-utils';


const getGolfCoursesByIds = async (golfCourseIds) => {
    const path = buildGolfCourseIdsUrl(golfCourseIds)
    const { data } = await footwedgeApi.get(path);
    return data;
}

const useGolfCourses = (golfCourseIds) => {
    return useQuery(
        ['golf-courses', ...golfCourseIds],
        async () => getGolfCoursesByIds(golfCourseIds),
        { enabled: !!golfCourseIds }
    );
}

const getGolfCourseById = async (id) => {
    const { data } = await footwedgeApi.get(`/golf-courses/${id}`);
    return data;
}

const useGolfCourse = (golfCourseId) => {
    return useQuery(
        ['golf-course', golfCourseId],
        async () => getGolfCourseById(golfCourseId),
        { enabled: !!golfCourseId }
    );
}

export { useGolfCourses, useGolfCourse, getGolfCoursesByIds };

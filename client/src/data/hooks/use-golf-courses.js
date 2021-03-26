import { useState, useEffect } from 'react';

import { footwedgeApi } from '../api-config';


export const useGolfCourses = () => {

    const [golfCourses, setGolfCourses] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const resp = await footwedgeApi.get('/golf-courses');
            console.log('resp', resp);
            setGolfCourses(resp.data.results);
        }

        getData();
    });

    return golfCourses;

}
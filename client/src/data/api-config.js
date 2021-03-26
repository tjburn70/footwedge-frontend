import axios from 'axios';

import { appConfig } from '../modules/config';
import { localStorageService } from '../modules/local-storage-service';
import { refreshAccessToken } from '../utils/auth';

const UNAUTHENTICATED_HTTP_CODE = 401;


export const footwedgeApi = axios.create({
    baseURL: appConfig.footwedgeApiBaseUrl,
});

footwedgeApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        config.headers['Accept'] = 'application/json';

        return config;
    },
    (error) => {
        console.log("uh oh an error in the request", error);
        Promise.reject(error);
    }
);

footwedgeApi.interceptors.response.use(
    (response) => {
        // if no error just return the response
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        console.log('resp error', error.response);
        if (error.response !== undefined && error.response.status === UNAUTHENTICATED_HTTP_CODE && !originalRequest._retry) {
            originalRequest._retry = true;
            // received a 401 from the server & we haven't retried the original request
            await refreshAccessToken();

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;

            return footwedgeApi(originalRequest);
        }

        return Promise.reject(error);
    }
)




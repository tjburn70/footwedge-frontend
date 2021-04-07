import axios from 'axios';

import { appConfig } from '../modules/config';
import { localStorageService } from '../modules/local-storage-service';
import { refreshAccessToken, logout } from '../utils/auth';

const UNAUTHENTICATED_HTTP_CODE = 401;


export const footwedgeApi = axios.create({
    baseURL: appConfig.footwedgeApiBaseUrl,
});

footwedgeApi.interceptors.request.use(
    (config) => {
        config.headers['Accept'] = 'application/json';

        if (config.requiresRefreshToken) {
            const refreshToken = localStorageService.getRefreshToken();
            config.headers['Authorization'] = `Bearer ${refreshToken}`;
            return config;
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        
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
        if (error.response !== undefined && error.response.status === UNAUTHENTICATED_HTTP_CODE && !originalRequest._retry) {
            originalRequest._retry = true;
            // received a 401 from the server & we haven't retried the original request
            await refreshAccessToken();

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorageService.getAccessToken()}`;

            return footwedgeApi(originalRequest);
        } else if (error.response !== undefined & error.response.status === UNAUTHENTICATED_HTTP_CODE && originalRequest._retry) {
            logout();
        }

        return Promise.reject(error);
    }
)




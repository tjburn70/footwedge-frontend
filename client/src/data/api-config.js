import axios from 'axios';
import { Auth } from 'aws-amplify';

import { appConfig } from '../modules/config';
import { history } from '../routes/history';

import { mockFootwedgeApi } from './mocks/mock-adapter';

const UNAUTHENTICATED_HTTP_CODE = 401;

export const footwedgeApi = axios.create({
    baseURL: appConfig.footwedgeApiBaseUrl,
});

footwedgeApi.interceptors.request.use(
    async (config) => {
        try {
            const currentSession = await Auth.currentSession();
            const idToken = currentSession.getIdToken().getJwtToken();
            config.headers['Accept'] = 'application/json';
            config.headers['Authorization'] = `Bearer ${idToken}`;

            return config;
        } catch (error) {
            console.log("uh oh user is not authenticated", error);
            await Auth.signOut();
        }
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
        if (error.response?.status === UNAUTHENTICATED_HTTP_CODE) {
            await Auth.signOut();
            history.push('/login');
            originalRequest._retry = true;
        }

        return Promise.reject(error);
    }
);

if (appConfig.useMocks) {
    mockFootwedgeApi(footwedgeApi);
}

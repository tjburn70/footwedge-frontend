import { appConfig } from './config';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const LAST_AUTH_USER_KEY = `CognitoIdentityServiceProvider.${appConfig.auth.userPoolWebClientId}.LastAuthUser`;

const LocalStorageService = () => {

    const _setTokens = (tokenPayload) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tokenPayload.access_token);
        localStorage.setItem(REFRESH_TOKEN_KEY, tokenPayload.refresh_token);
    }

    const _setAccessToken = (accessToken) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    const _getAccessToken = () => {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    const _getRefreshToken = () => {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    const _clearTokens = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    const _getLastAuthUser = () => {
        return localStorage.getItem(LAST_AUTH_USER_KEY);
    }

    return {
        setTokens: _setTokens,
        setAccessToken: _setAccessToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        clearTokens: _clearTokens,
        getLastAuthUser: _getLastAuthUser,
    }

}

export const localStorageService = LocalStorageService();

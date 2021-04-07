import { footwedgeApi } from '../data/api-config';

import { localStorageService } from '../modules/local-storage-service';
import { history } from '../routes/history';


export const refreshAccessToken = async () => {
    const config = {
        method: 'post',
        url: '/auth/refresh',
        requiresRefreshToken: true,
    }
    const resp = await footwedgeApi(config);
    localStorageService.setAccessToken(resp.data.access_token);
}

export const login = async ({email, password}) => {
    const config = {
        method: 'post',
        url: '/user/login',
        headers: {'Content-Type': 'application/json'},
        data: {email: email, password: password},
    }
    const resp = await footwedgeApi(config);
    localStorageService.setTokens(resp.data);
    history.push('/player-profile');
}

export const logout = async () => {
    const config = {
        method: 'delete',
        url: '/user/logout',
        requiresRefreshToken: true,
    }
    await footwedgeApi(config);
    localStorageService.clearTokens();
    history.push('/');
}

export const isLoggedIn = () => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken !== null) {
        return true;
    } else {
        return false;
    }
}

import { footwedgeApi } from '../data/api-config';

import { localStorageService } from '../modules/local-storage-service';


export const refreshAccessToken = async () => {
    const refreshToken = localStorageService.getRefreshToken();
    const config = {
        method: 'post',
        url: '/auth/refresh',
        headers: {'Authorization': `Bearer ${refreshToken}`},
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
}

export const logout = async () => {
    const config = {
        method: 'delete',
        url: '/user/logout',
    }
    await footwedgeApi(config);
    localStorageService.clearTokens();
}

export const isLoggedIn = () => {
    const accessToken = localStorageService.getAccessToken();
    console.log("accessToken", accessToken);
    if (accessToken !== null) {
        return true;
    } else {
        return false;
    }
}

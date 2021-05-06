const getConfig = () => {
    const config = {
        footwedgeApiBaseUrl: process.env.REACT_APP_FOOTWEDGE_API_URL,
        environment: process.env.REACT_APP_ENV,
        auth: {
            region: process.env.REACT_APP_COGNITO_REGION,
            userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
            userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        }
    };

    return config;
}

export const appConfig = getConfig();

const getConfig = () => {
    const config = {
        footwedgeApiBaseUrl: process.env.REACT_APP_FOOTWEDGE_API_URL,
        environment: process.env.REACT_APP_ENV,
    };

    return config;
}

export const appConfig = getConfig();

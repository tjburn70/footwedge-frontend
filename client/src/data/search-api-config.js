import axios from 'axios';

import { appConfig } from '../modules/config';

export const searchApi = axios.create({
    baseURL: appConfig.searchServiceApiUrl,
});

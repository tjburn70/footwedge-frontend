import MockAdapter from 'axios-mock-adapter';

import { ACTIVE_HANDICAP_SUCCESS_RESPONSE } from './handicap';
import { PLAYER_ROUNDS_SUCCESS_RESPONSE } from './player-rounds';
import { AGGREGATE_STATS_SUCCESS_RESPONSE } from './aggregate-stats';
import { CANTIGNY_LAKESIDE_WOODSIDE_GOLF_COURSE_ID } from './golf-course';
import { 
    CANTIGNY_LAKESIDE_WOODSIDE_GOLD_TEE_BOX_ID,
    CANTIGNY_LAKESIDE_WOODSIDE_GOLD_TEE_BOX_SUCCESS_RESPONSE
} from './tee-box'

const OK_HTTP_CODE = 200;

const FOOTWEDGE_API_GET_RESPONSES = [
    {
        body: ACTIVE_HANDICAP_SUCCESS_RESPONSE,
        path: '/handicaps/active',
        statusCode: OK_HTTP_CODE,
    },
    {
        body: PLAYER_ROUNDS_SUCCESS_RESPONSE,
        path: '/golf-rounds/',
        statusCode: OK_HTTP_CODE,
    },
    {
        body: AGGREGATE_STATS_SUCCESS_RESPONSE,
        path: '/golf-rounds/aggregate-stats',
        statusCode: OK_HTTP_CODE,
    },
    {
        body: CANTIGNY_LAKESIDE_WOODSIDE_GOLD_TEE_BOX_SUCCESS_RESPONSE,
        path: `/golf-course/${CANTIGNY_LAKESIDE_WOODSIDE_GOLF_COURSE_ID}/tee-boxes/${CANTIGNY_LAKESIDE_WOODSIDE_GOLD_TEE_BOX_ID}`,
        statusCode: OK_HTTP_CODE,
    }
];

const mockFootwedgeApi = (axiosInstance) => {
    const footwedgeApiMock = new MockAdapter(axiosInstance, { delayResponse: 2000, onNoMatch: 'passthrough' });
    FOOTWEDGE_API_GET_RESPONSES.forEach((response) => 
        footwedgeApiMock.onGet(response.path).reply(response.statusCode, response.body)
    );
};

export { mockFootwedgeApi };

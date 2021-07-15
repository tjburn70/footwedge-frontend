import { PLAYER_ROUND_1_ID, PLAYER_ROUND_2_ID } from './player-rounds';

const PLAYER_ROUND_1_AGGREGATE_STATS = {
    putts: 34,
    fairways: 9,
    greens_in_regulation: 12,
    penalties: 2,
    three_putts: 1,
    up_and_downs: 2,
    sand_saves: 1,
    birdies: 2,
    pars: 11,
    bogeys: 2,
    double_bogeys: 3,
};

const AGGREGATE_STATS_BY_ROUND_ID = {};
AGGREGATE_STATS_BY_ROUND_ID[PLAYER_ROUND_1_ID] = PLAYER_ROUND_1_AGGREGATE_STATS;
AGGREGATE_STATS_BY_ROUND_ID[PLAYER_ROUND_2_ID] = null;

const AGGREGATE_STATS_SUCCESS_RESPONSE = {
    status: "success",
    data: AGGREGATE_STATS_BY_ROUND_ID,
    message: null,
    metadata: null
}

export { AGGREGATE_STATS_SUCCESS_RESPONSE };

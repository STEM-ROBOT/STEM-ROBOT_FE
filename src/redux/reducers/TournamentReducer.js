import { GET_TOURNAMENT_MODERATOR_FAIL, GET_TOURNAMENT_MODERATOR_REQUEST, GET_TOURNAMENT_MODERATOR_RESET, GET_TOURNAMENT_MODERATOR_SUCCESS } from "../constants/TournamentConstant";

export const getTournamentModeratorReducer = (state = { listTournament:[]}, action) => {
    switch (action.type) {
        case GET_TOURNAMENT_MODERATOR_REQUEST:
            return { loading: true };
        case GET_TOURNAMENT_MODERATOR_SUCCESS:
            return { loading: false, listTournament: action.payload };
        case GET_TOURNAMENT_MODERATOR_FAIL:
            return { loading: false, error: action.payload };
        case GET_TOURNAMENT_MODERATOR_RESET:
            return {};
        default:
            return state;
    }
};
import { CREATE_TOURNAMENT_FAIL, CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_RESET, CREATE_TOURNAMENT_SUCCESS, GET_TOURNAMENT_INFO_FAIL, GET_TOURNAMENT_INFO_REQUEST, GET_TOURNAMENT_INFO_RESET, GET_TOURNAMENT_INFO_SUCCESS, GET_TOURNAMENT_MODERATOR_FAIL, GET_TOURNAMENT_MODERATOR_REQUEST, GET_TOURNAMENT_MODERATOR_RESET, GET_TOURNAMENT_MODERATOR_SUCCESS } from "../constants/TournamentConstant";

export const getTournamentModeratorReducer = (state = { listTournament: [] }, action) => {
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

export const getTournamentInfoReducer = (state = { tournamentInfo: {} }, action) => {
    switch (action.type) {
        case GET_TOURNAMENT_INFO_REQUEST:
            return { loading: true };
        case GET_TOURNAMENT_INFO_SUCCESS:
            return { loading: false, tournamentInfo: action.payload };
        case GET_TOURNAMENT_INFO_FAIL:
            return { loading: false, error: action.payload };
        case GET_TOURNAMENT_INFO_RESET:
            return {};
        default:
            return state;
    }
};

export const createTournamentInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TOURNAMENT_REQUEST:
            return { loading: true };
        case CREATE_TOURNAMENT_SUCCESS:
            return { loading: false, success:true };
        case CREATE_TOURNAMENT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_TOURNAMENT_RESET:
            return {};
        default:
            return state;
    }
};



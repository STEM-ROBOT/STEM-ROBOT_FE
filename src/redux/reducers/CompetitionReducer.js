import { ACTIVE_COMPETITION_FAIL, ACTIVE_COMPETITION_REQUEST, ACTIVE_COMPETITION_RESET, ACTIVE_COMPETITION_SUCCESS, ADD_COMPETITION_FORMAT_FAIL, ADD_COMPETITION_FORMAT_REQUEST, ADD_COMPETITION_FORMAT_RESET, ADD_COMPETITION_FORMAT_SUCCESS, GET_COMPETITION_INFO_FAIL, GET_COMPETITION_INFO_REQUEST, GET_COMPETITION_INFO_RESET, GET_COMPETITION_INFO_SUCCESS, GET_COMPETITION_MODERATOR_FAIL, GET_COMPETITION_MODERATOR_REQUEST, GET_COMPETITION_MODERATOR_RESET, GET_COMPETITION_MODERATOR_SUCCESS } from "../constants/CompetitionConstant";


export const getCompetitionModeratorReducer = (state = { listCompetition:[]}, action) => {
    switch (action.type) {
        case GET_COMPETITION_MODERATOR_REQUEST:
            return { loading: true };
        case GET_COMPETITION_MODERATOR_SUCCESS:
            return { loading: false, listCompetition: action.payload };
        case GET_COMPETITION_MODERATOR_FAIL:
            return { loading: false, error: action.payload };
        case GET_COMPETITION_MODERATOR_RESET:
            return {};
        default:
            return state;
    }
};

export const getCompetitionInfoReducer = (state = { infoCompetition:{}}, action) => {
    switch (action.type) {
        case GET_COMPETITION_INFO_REQUEST:
            return { loading: true };
        case GET_COMPETITION_INFO_SUCCESS:
            return { loading: false, infoCompetition: action.payload };
        case GET_COMPETITION_INFO_FAIL:
            return { loading: false, error: action.payload };
        case GET_COMPETITION_INFO_RESET:
            return {};
        default:
            return state;
    }
};

export const addCompetitionFormatReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COMPETITION_FORMAT_REQUEST:
            return { loading: true };
        case ADD_COMPETITION_FORMAT_SUCCESS:
            return { loading: false, success:true };
        case ADD_COMPETITION_FORMAT_FAIL:
            return { loading: false, error: action.payload };
        case ADD_COMPETITION_FORMAT_RESET:
            return {};
        default:
            return state;
    }
};

export const activeCompetitionReducer = (state = {}, action) => {
    switch (action.type) {
        case ACTIVE_COMPETITION_REQUEST:
            return { loading: true };
        case ACTIVE_COMPETITION_SUCCESS:
            return { loading: false, success:true };
        case ACTIVE_COMPETITION_FAIL:
            return { loading: false, error: action.payload };
        case ACTIVE_COMPETITION_RESET:
            return {};
        default:
            return state;
    }
};
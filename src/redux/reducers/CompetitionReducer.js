import { GET_COMPETITION_MODERATOR_FAIL, GET_COMPETITION_MODERATOR_REQUEST, GET_COMPETITION_MODERATOR_RESET, GET_COMPETITION_MODERATOR_SUCCESS } from "../constants/CompetitionConstant";


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
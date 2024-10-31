import { GET_TEAMS_FAIL, GET_TEAMS_REQUEST, GET_TEAMS_RESET, GET_TEAMS_SUCCESS } from "../constants/TeamConstant";


export const getTeamsReducer = (state = { listTeam: [] }, action) => {
    switch (action.type) {
        case GET_TEAMS_REQUEST:
            return { loading: true };
        case GET_TEAMS_SUCCESS:
            return { loading: false, listTeam: action.payload };
        case GET_TEAMS_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAMS_RESET:
            return {};
        default:
            return state;
    }
};
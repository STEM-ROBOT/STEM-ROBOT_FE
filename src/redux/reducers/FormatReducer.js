import { GET_ACTIVE_FORMAT_FAIL, GET_ACTIVE_FORMAT_REQUEST, GET_ACTIVE_FORMAT_RESET, GET_ACTIVE_FORMAT_SUCCESS } from "../constants/FormatConstant";

export const getActiveCompetitionReducer = (state = { data:{}}, action) => {
    switch (action.type) {
        case GET_ACTIVE_FORMAT_REQUEST:
            return { loading: true };
        case GET_ACTIVE_FORMAT_SUCCESS:
            return { loading: false, data: action.payload };
        case GET_ACTIVE_FORMAT_FAIL:
            return { loading: false, error: action.payload };
        case GET_ACTIVE_FORMAT_RESET:
            return {};
        default:
            return state;
    }
};
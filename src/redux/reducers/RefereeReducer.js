import { CREATE_REFEREE_FAIL, CREATE_REFEREE_REQUEST, CREATE_REFEREE_RESET, CREATE_REFEREE_SUCCESS, GET_REFEREE_FAIL, GET_REFEREE_REQUEST, GET_REFEREE_RESET, GET_REFEREE_SUCCESS } from "../constants/RefereeConstant";

export const getRefereeReducer = (state = { listReferee: [] }, action) => {
    switch (action.type) {
        case GET_REFEREE_REQUEST:
            return { loading: true };
        case GET_REFEREE_SUCCESS:
            return { loading: false, listReferee: action.payload };
        case GET_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case GET_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};


export const createRefereeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REFEREE_REQUEST:
            return { loading: true };
        case CREATE_REFEREE_SUCCESS:
            return { loading: false, success:true };
        case CREATE_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};
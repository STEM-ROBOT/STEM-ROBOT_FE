import { CREATE_CONTESTANT_FAIL, CREATE_CONTESTANT_REQUEST, CREATE_CONTESTANT_RESET, CREATE_CONTESTANT_SUCCESS, GET_CONTESTANT_FAIL, GET_CONTESTANT_REQUEST, GET_CONTESTANT_RESET, GET_CONTESTANT_SUCCESS } from "../constants/ContestantConstant";


export const getContestantReducer = (state = { listContestant:[]}, action) => {
    switch (action.type) {
        case GET_CONTESTANT_REQUEST:
            return { loading: true };
        case GET_CONTESTANT_SUCCESS:
            return { loading: false, listContestant: action.payload };
        case GET_CONTESTANT_FAIL:
            return { loading: false, error: action.payload };
        case GET_CONTESTANT_RESET:
            return {};
        default:
            return state;
    }
};


export const createContestantReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CONTESTANT_REQUEST:
            return { loading: true };
        case CREATE_CONTESTANT_SUCCESS:
            return { loading: false, success:true };
        case CREATE_CONTESTANT_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_CONTESTANT_RESET:
            return {};
        default:
            return state;
    }
};
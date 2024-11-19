import { ADD_SCORE_FAIL, ADD_SCORE_REQUEST, ADD_SCORE_RESET, ADD_SCORE_SUCCESS, GET_SCORE_FAIL, GET_SCORE_REQUEST, GET_SCORE_RESET, GET_SCORE_SUCCESS } from "../constants/ScoreConstant";


export const addScoreReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_SCORE_REQUEST:
            return { loading: true };
        case ADD_SCORE_SUCCESS:
            return { loading: false, success:true };
        case ADD_SCORE_FAIL:
            return { loading: false, error: action.payload };
        case ADD_SCORE_RESET:
            return {};
        default:
            return state;
    }
};

export const getScoreReducer = (state = { listScore: [] }, action) => {
    switch (action.type) {
        case GET_SCORE_REQUEST:
            return { loading: true };
        case GET_SCORE_SUCCESS:
            return { loading: false, listScore:action.payload };
        case GET_SCORE_FAIL:
            return { loading: false, error: action.payload };
        case GET_SCORE_RESET:
            return {};
        default:
            return state;
    }
};
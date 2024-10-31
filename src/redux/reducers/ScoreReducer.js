import { ADD_SCORE_FAIL, ADD_SCORE_REQUEST, ADD_SCORE_RESET, ADD_SCORE_SUCCESS } from "../constants/ScoreConstant";


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
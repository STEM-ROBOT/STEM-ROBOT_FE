import api from "/src/config";
import { ADD_SCORE_FAIL, ADD_SCORE_REQUEST, ADD_SCORE_SUCCESS, GET_SCORE_FAIL, GET_SCORE_REQUEST, GET_SCORE_SUCCESS } from "../constants/ScoreConstant";

export const addScoreCompetition = (competitionId, listScore) => async (dispatch) => {
    console.log(competitionId,listScore)

    try {
        dispatch({ type: ADD_SCORE_REQUEST });
        const { newdata } = await api.post(`api/scores/${competitionId}`,listScore);
        dispatch({ type: ADD_SCORE_SUCCESS, payload: newdata });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: ADD_SCORE_FAIL,
            payload: message,
        });
    }
};

export const getScoreCompetition = (competitionId) => async (dispatch) => {   
    try {
        dispatch({ type: GET_SCORE_REQUEST });
        const { data } = await api.get(`/api/scores/byCompetitionId?competitionId=${competitionId}`);
        dispatch({ type: GET_SCORE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: GET_SCORE_FAIL,
            payload: message,
        });
    }
};
import api from "../../config";
import { ADD_SCORE_FAIL, ADD_SCORE_REQUEST, ADD_SCORE_SUCCESS } from "../constants/ScoreConstant";

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
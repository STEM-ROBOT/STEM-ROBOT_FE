import api from "../../config";
import { GET_COMPETITION_INFO_FAIL, GET_COMPETITION_INFO_REQUEST, GET_COMPETITION_INFO_SUCCESS, GET_COMPETITION_MODERATOR_FAIL, GET_COMPETITION_MODERATOR_REQUEST, GET_COMPETITION_MODERATOR_SUCCESS } from "../constants/CompetitionConstant";


export const getCompetition = () => async (dispatch) => {
    try {
      dispatch({ type: GET_COMPETITION_MODERATOR_REQUEST });
  
      const { data } = await api.get(`/api/tournaments/list-tournament-moderator`);
  
      dispatch({ type: GET_COMPETITION_MODERATOR_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_COMPETITION_MODERATOR_FAIL,
        payload: message,
      });
    }
  };

  export const getCompetitionInfo = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_COMPETITION_INFO_REQUEST });
  
      const { data } = await api.get(`/api/competitions/Infor?id=${id}`);
  
      dispatch({ type: GET_COMPETITION_INFO_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_COMPETITION_INFO_FAIL,
        payload: message,
      });
    }
  };
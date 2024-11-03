import api from "../../config";
import { GET_TEAMS_FAIL, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS } from "../constants/TeamConstant";

export const getListTeam = (competitionId) => async (dispatch) => {
    try {
      dispatch({ type: GET_TEAMS_REQUEST });
  
      const { data } = await api.get(`/api/teams/getTeamByCompetitonId/${competitionId}`);
  
      dispatch({ type: GET_TEAMS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_TEAMS_FAIL,
        payload: message,
      });
    }
  };
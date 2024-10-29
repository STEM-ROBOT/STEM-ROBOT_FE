import api from "../../config";
import { GET_CONTESTANT_FAIL, GET_CONTESTANT_REQUEST, GET_CONTESTANT_SUCCESS } from "../constants/ContestantConstant";



export const getListContestant = (tournamentId) => async (dispatch) => {
    try {
      dispatch({ type: GET_CONTESTANT_REQUEST });
  
      const { data } = await api.get(`/api/contestants/tournamentId?tournamentId=${tournamentId}`);
  
      dispatch({ type: GET_CONTESTANT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_CONTESTANT_FAIL,
        payload: message,
      });
    }
  };
import api from "/src/config";
import { GET_ACTIVE_FORMAT_FAIL, GET_ACTIVE_FORMAT_REQUEST, GET_ACTIVE_FORMAT_SUCCESS } from "../constants/FormatConstant";

export const getActive = (competitionId) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_FORMAT_REQUEST });
  
      const { data } = await api.get(`/api/competitions/active/${competitionId}`);
  
      dispatch({ type: GET_ACTIVE_FORMAT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_ACTIVE_FORMAT_FAIL,
        payload: message,
      });
    }
  };
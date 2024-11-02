import api from "../../config";
import { CREATE_REFEREE_FAIL, CREATE_REFEREE_REQUEST, CREATE_REFEREE_SUCCESS, GET_REFEREE_FAIL, GET_REFEREE_REQUEST, GET_REFEREE_SUCCESS } from "../constants/RefereeConstant";

export const getListReferee = (tournamentId) => async (dispatch) => {
    try {
      dispatch({ type: GET_REFEREE_REQUEST });
  
      const { data } = await api.get(`/api/referees/bytournamentId=${tournamentId}`);
  
      dispatch({ type: GET_REFEREE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_REFEREE_FAIL,
        payload: message,
      });
    }
  };

  export const addReferee = (referee) => async (dispatch) => {
    console.log("Payload gửi đi:", referee); // Kiểm tra cấu trúc payload trước khi gửi

    try {
        dispatch({ type: CREATE_REFEREE_REQUEST });

        const { data } = await api.post(
            `/api/referees/list-referee`,
            referee,
            {
                headers: {
                    "Content-Type": "application/json", // Đảm bảo định dạng JSON
                },
            }
        );

        dispatch({ type: CREATE_REFEREE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: CREATE_REFEREE_FAIL,
            payload: message,
        });
    }
};
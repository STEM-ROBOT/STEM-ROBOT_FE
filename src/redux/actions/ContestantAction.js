import { toast } from "react-toastify";

import { CREATE_CONTESTANT_FAIL, CREATE_CONTESTANT_REQUEST, CREATE_CONTESTANT_SUCCESS, GET_CONTESTANT_FAIL, GET_CONTESTANT_REQUEST, GET_CONTESTANT_SUCCESS } from "../constants/ContestantConstant";
import api from "/src/config";



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

  export const addContestant = (touramentId,contestants) => async (dispatch) => {
    console.log(touramentId, contestants);

    try {
        dispatch({ type: CREATE_CONTESTANT_REQUEST });

        const { data } = await api.post(
            `api/contestants/list-contestant?tournamentId=${touramentId}`,
            contestants,
            {
                headers: {
                    "Content-Type": "application/json", // Đảm bảo định dạng JSON
                },
            }
        );

        dispatch({ type: CREATE_CONTESTANT_SUCCESS, payload: data });
        toast.success("Thêm thành công");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: CREATE_CONTESTANT_FAIL,
            payload: message,
        });
        toast.error("Thêm thất bại");
    }
};
import { toast } from "react-toastify";

import { ADD_SCHEDULE_REFEREE_FAIL, ADD_SCHEDULE_REFEREE_REQUEST, ADD_SCHEDULE_REFEREE_SUCCESS, CREATE_REFEREE_FAIL, CREATE_REFEREE_REQUEST, CREATE_REFEREE_SUCCESS, GET_FREETIME_REFEREE_FAIL, GET_FREETIME_REFEREE_REQUEST, GET_FREETIME_REFEREE_SUCCESS, GET_REFEREE_FAIL, GET_REFEREE_REQUEST, GET_REFEREE_SUCCESS, GET_SCHEDULE_REFEREE_FAIL, GET_SCHEDULE_REFEREE_REQUEST, GET_SCHEDULE_REFEREE_SUCCESS } from "../constants/RefereeConstant";
import api from "../../Config";

export const getListReferee = (tournamentId) => async (dispatch) => {
    try {
      dispatch({ type: GET_REFEREE_REQUEST });
  
      const { data } = await api.get(`api/referees/byTournamnet/${tournamentId}`);
  
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
        toast.success("Thêm thành công")
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
        toast.success("Thêm thất bại");
    }
};

export const getListRefereeFreeTime = (tournamentId) => async (dispatch) => {
  try {
    dispatch({ type: GET_FREETIME_REFEREE_REQUEST });

    const { data } = await api.get(`/api/referees/free-referee?tournamentId=${tournamentId}`);
    console.log(tournamentId)
    dispatch({ type: GET_FREETIME_REFEREE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_FREETIME_REFEREE_FAIL,
      payload: message,
    });
  }
};

export const getRefereeSchedule = (competitionId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SCHEDULE_REFEREE_REQUEST });

    const { data } = await api.get(`/api/schedules/match-config-schedule?competitionId=${competitionId}`);
    console.log(data)
    dispatch({ type: GET_SCHEDULE_REFEREE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_SCHEDULE_REFEREE_FAIL,
      payload: message,
    });
  }
};

export const addRefereeSchedule = (competitionId,refereeSchedule) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SCHEDULE_REFEREE_REQUEST });

    const { data } = await api.post(`/api/schedules?competitionId=${competitionId}`,refereeSchedule);
    console.log(data)
    dispatch({ type: ADD_SCHEDULE_REFEREE_SUCCESS, payload: data });
    toast.success("Thêm Thành Công .")
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: ADD_SCHEDULE_REFEREE_FAIL,
      payload: message,
    });
  }
};
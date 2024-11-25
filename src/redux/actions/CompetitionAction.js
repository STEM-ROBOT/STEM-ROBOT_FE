import { toast } from "react-toastify";

import { ACTIVE_COMPETITION_FAIL, ACTIVE_COMPETITION_REQUEST, ACTIVE_COMPETITION_SUCCESS, ADD_COMPETITION_FORMAT_FAIL, ADD_COMPETITION_FORMAT_REQUEST, ADD_COMPETITION_FORMAT_SUCCESS, GET_COMPETITION_INFO_FAIL, GET_COMPETITION_INFO_REQUEST, GET_COMPETITION_INFO_SUCCESS, GET_COMPETITION_MODERATOR_FAIL, GET_COMPETITION_MODERATOR_REQUEST, GET_COMPETITION_MODERATOR_SUCCESS } from "../constants/CompetitionConstant";
import api from "/src/config";


export const getCompetitionbyTournament = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_COMPETITION_MODERATOR_REQUEST });
  
      const { data } = await api.get(`/api/competitions/tournament?id=${id}`);
  
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
      console.log(data);
      
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

  export const addCompetitionFormat = (competitionId,format) => async (dispatch) => {
    try {
      dispatch({ type: ADD_COMPETITION_FORMAT_REQUEST });
  
      const { data } = await api.put(`/api/competitions/format-config?competitionId=${competitionId}`,format);
  
      dispatch({ type: ADD_COMPETITION_FORMAT_SUCCESS, payload: data });
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
        type: ADD_COMPETITION_FORMAT_FAIL,
        payload: message,
      });
    }
  };

  export const activeCompetition = (competitionId) => async (dispatch) => {
    try {
      dispatch({ type: ACTIVE_COMPETITION_REQUEST });
  
      const { data } = await api.put(`/api/competitions/set-active?competitionId=${competitionId}`);
  
      dispatch({ type: ACTIVE_COMPETITION_SUCCESS, payload: data });
      if(data.code === "400"){
        toast.error("Vui lòng cấu hình trước khi kích hoạt !!")
      }else{
        toast.success("Thêm thành công")
      }
    
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      
      }
      dispatch({
        type: ACTIVE_COMPETITION_FAIL,
        payload: message,
      });
    }
  };
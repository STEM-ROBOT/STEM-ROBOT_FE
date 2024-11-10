import { toast } from "react-toastify";
import api from "/src/config";
import { GET_LOCATION_FAIL, GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS } from "../constants/LocationConstant";


export const getLocations = (competitionId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LOCATION_REQUEST });
  
      const { data } = await api.get(`/api/locations/competitionId?competitionId=${competitionId}`);
  
      dispatch({ type: GET_LOCATION_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_LOCATION_FAIL,
        payload: message,
      });
    }
  };

  export const addLocations = (competitionId,listlocation) => async (dispatch) => {
    try {
      dispatch({ type: GET_LOCATION_REQUEST });
  
      const { data } = await api.post(`/api/locations/list-location?competitionId=${competitionId}`,listlocation);
  
      dispatch({ type: GET_LOCATION_SUCCESS, payload: data });
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
        type: GET_LOCATION_FAIL,
        payload: message,
      });
    }
  };
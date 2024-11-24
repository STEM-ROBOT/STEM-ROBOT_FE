import { toast } from "react-toastify";
import api from "../../config";
import { CREATE_CONTESTANT_FAIL, CREATE_CONTESTANT_REQUEST, CREATE_CONTESTANT_SUCCESS } from "../constants/ContestantConstant";

export const createPayment = (user) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_CONTESTANT_REQUEST });
  
      const { data } = await api.post(`/api/orders`,user);
      console.log(data)
  
      dispatch({ type: CREATE_CONTESTANT_SUCCESS, payload: data });
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
    }
  };
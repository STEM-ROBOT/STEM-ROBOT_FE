import jwtDecode from "jwt-decode";
import api from "/src/config";
import TokenService from "/src/config/tokenservice";
import { ADD_GENRE_FAIL, ADD_GENRE_REQUEST, ADD_GENRE_SUCCESS, GET_ACCOUNT_FAIL, GET_ACCOUNT_REQUEST, GET_ACCOUNT_RESET, GET_ACCOUNT_SUCCESS, GET_GENRE_FAIL, GET_GENRE_REQUEST, GET_GENRE_RESET, GET_GENRE_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_RESET, GET_ORDER_SUCCESS, UPDATE_GENRE_FAIL, UPDATE_GENRE_REQUEST, UPDATE_GENRE_SUCCESS } from "../constants/AdminConstant";
import { toast } from "react-toastify";


export const ListAccount = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNT_REQUEST });
    const { data } = await api.get("/api/admin/list-account");
    //  console.log("Fetched API Data:", data);
    dispatch({ type: GET_ACCOUNT_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_ACCOUNT_FAIL,
      payload: message,
    });
  }
}
export const ListGenre = () => async (dispatch) => {
  try {
    dispatch({ type: GET_GENRE_REQUEST });
    const { data } = await api.get("/api/admin/list-genre");
    console.log("Fetched API Data:", data);
    dispatch({ type: GET_GENRE_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_GENRE_FAIL,
      payload: message,
    });
  }
}

export const ListOrder = (nameUser = '') => async (dispatch) => {
  try {
    dispatch({ type: GET_ORDER_REQUEST });
    const Url = nameUser ? `/api/admin/list-order?nameUser=${encodeURIComponent(nameUser)}` : `/api/admin/list-order`;

    const { data } = await api.get(Url);
    //  console.log("Fetched API Data:", data);
    dispatch({ type: GET_ORDER_SUCCESS, payload: data })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_ORDER_FAIL,
      payload: message,
    });
  }
}


export const addGenreAction = (genre) => async (dispatch) => {
  try {
    dispatch({ type: ADD_GENRE_REQUEST });

    const { data } = await api.put(`/api/genres`,genre);

    dispatch({ type: ADD_GENRE_SUCCESS, payload: data });
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
      type: ADD_GENRE_FAIL,
      payload: message,
    });
  }
};

export const updateGenreAction = (id,genre) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GENRE_REQUEST });    
    const { data } = await api.put(`/api/genres/${id}`,genre);

    dispatch({ type: UPDATE_GENRE_SUCCESS, payload: data });
    toast.success("Thành công")
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: UPDATE_GENRE_FAIL,
      payload: message,
    });
  }
};

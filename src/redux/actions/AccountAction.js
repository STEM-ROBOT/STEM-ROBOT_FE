import jwtDecode from "jwt-decode";
import { GET_ACCOUNTID_FAIL,GET_ACCOUNTID_REQUEST,GET_ACCOUNTID_SUCCESS,GET_ACCOUNTID_RESET, CHANGE_INFOR_REQUEST,CHANGE_INFOR_SUCCESS,CHANGE_INFOR_FAIL } from "../constants/AccountConstant";
import TokenService from "../../config/tokenservice";
import api from "../../config";

// api Infor AccountID
export const InforAccountID = () =>async(dispatch) =>{
    try {
        dispatch ({type : GET_ACCOUNTID_REQUEST });
        const token = TokenService.getLocalAccessToken();
        console.log(token);
        const decode = jwtDecode(token);
        const userID = decode.userId;
        const { data } = await api.get(`/api/accounts/userId`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        dispatch({ type: GET_ACCOUNTID_SUCCESS, payload: data });
    
     
    } catch (error) {
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_ACCOUNTID_FAIL,
        payload: message,
      });
    }
}
export const ChangePasswordUser = (pasword) =>async(dispatch) =>{
  try {
      dispatch ({type : GET_ACCOUNTID_REQUEST });
      const token = TokenService.getLocalAccessToken();
      console.log(token);
      const decode = jwtDecode(token);
      const userID = decode.userId;
      const { data } = await api.put(`/api/accounts/change-password`,{
        passwordOld : pasword.passwordOld,
        newPassword : pasword.newPassword,
        confirmPass : pasword.confirmPass
      }, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log(data);
      dispatch({ type: GET_ACCOUNTID_SUCCESS, payload: data });
  
   
  } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_ACCOUNTID_FAIL,
      payload: message,
    });
  }
}

export const ChangeInfor = (infor) => (dispatch) =>{
  try {
      dispatch ({type : CHANGE_INFOR_REQUEST });   
      const updatedInfo = {
        name: infor.name,
        phoneNumber: infor.phoneNumber,
        email: infor.email
      };
  
      const { data } =  api.put(`/api/accounts/update-account`,
        updatedInfo
      )
      console.log(data);
      dispatch({ type: CHANGE_INFOR_SUCCESS, payload: data });
  
   
  } catch (error) {
      const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: CHANGE_INFOR_FAIL,
      payload: message,
    });
  }
}
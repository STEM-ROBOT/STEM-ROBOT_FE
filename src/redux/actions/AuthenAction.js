import jwtDecode from "jwt-decode";
import api from "../../config";
import TokenService from "../../config/tokenservice";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/AuthenConstant";
import { toast } from "react-toastify";


export const login = (user, navigate, setSignIn) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await api.post("/api/auth/login", user);

        if (data.result.token) {
            const token = jwtDecode(data.result.token);
            TokenService.setUser(data.result.token);
            TokenService.setUserId(token.Id);
            TokenService.setUserRole(token.role);
            TokenService.setUserName(token.unique_name);

            dispatch({ type: LOGIN_SUCCESS, payload: data });
            toast.success("Login successful");

            setSignIn(false);  // Tắt popup đăng nhập khi thành công
        }
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        });
    }
};

export const logout = () => (dispatch) => {
    TokenService.removeUser();
    dispatch({ type: LOGOUT });
};
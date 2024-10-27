import api from "../../config";
import TokenService from "../../config/tokenservice";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../constants/AuthenConstant";


export const login = (user, navigate) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await api.post("/api/auth/login", user);

        if (data.result.token) {
            console.log(data);
            TokenService.setUser(data.result.token);
            // const token = jwtDecode(data.tokens);
            // TokenService.setUserId(token.id);
            // TokenService.setUserRole(token.role);
            console.log("dsa");
            dispatch({ type: LOGIN_SUCCESS, payload: data });
            navigate("/league");
        }
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        });

        //   toast.error("Sai Email hoặc mật khẩu !!");
    }
};

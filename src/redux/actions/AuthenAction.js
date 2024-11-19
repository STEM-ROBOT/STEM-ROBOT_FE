import jwtDecode from "jwt-decode";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/AuthenConstant";
import { toast } from "react-toastify";
import api from "/src/config";
import TokenService from "../../config/tokenservice";


export const login = (user, navigate, setSignIn) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const { data } = await api.post("/api/auth/login", user);

        if (data.result.token) {
            const token = jwtDecode(data.result.token);
            console.log(token)
            TokenService.setUser(data.result.token);
            TokenService.setUserId(token.Id);
            TokenService.setUserRole(token.role);
            TokenService.setUserName(token.unique_name);
            TokenService.setSchoolName(token.SchoolName);
            TokenService.setUserImage(token.Image)
           

            dispatch({ type: LOGIN_SUCCESS, payload: data });
            if(token.role === "AD"){
                navigate("/admin/dashboard");
            }else if(token.role === "RF"){
                navigate("/referee-main");
            }
            toast.success("Đăng nhập thành công");
            setSignIn(false); 
        }
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            toast.error("Đăng nhập thất bại");
        dispatch({
            type: LOGIN_FAIL,
            payload: message,
        });
    }
};

export const logout = (navigate) => (dispatch) => {
    TokenService.removeUser();  
    dispatch({ type: LOGOUT });
    navigate("/home");
};
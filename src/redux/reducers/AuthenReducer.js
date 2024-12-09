import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_RESET, REGISTER_USER_SUCCESS } from "../constants/AuthenConstant";


export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload , success:true };
        case LOGIN_FAIL:
            return { loading: false, error: action.payload ,success:false};
        case LOGOUT:
                return { ...state, userInfo: null };
        default:
            return state;
    }
};

export const RegisterUserReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return { loading: true };
        case REGISTER_USER_SUCCESS:
            return { loading: false, success:true };
        case REGISTER_USER_FAIL:
            return { loading: false, error: action.payload };
        case REGISTER_USER_RESET:
                return { ...state, error: true };
        default:
            return state;
    }
};
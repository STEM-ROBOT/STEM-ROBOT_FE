import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../constants/AuthenConstant";


export const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case LOGOUT:
                return { ...state, userInfo: null };
        default:
            return state;
    }
};
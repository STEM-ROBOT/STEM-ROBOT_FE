import { GET_ACCOUNTID_FAIL,GET_ACCOUNTID_REQUEST,GET_ACCOUNTID_RESET,GET_ACCOUNTID_SUCCESS,CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_RESET,CHANGE_PASSWORD_SUCCESS,CHANGE_INFOR_FAIL,CHANGE_INFOR_REQUEST,CHANGE_INFOR_RESET,CHANGE_INFOR_SUCCESS } from "../constants/AccountConstant";
export const InforAccountID = (state = {}, action) =>{
    switch(action.type){
        case GET_ACCOUNTID_REQUEST:
            return { loading: true };
        case GET_ACCOUNTID_SUCCESS:
            return { loading: false, success: action.payload };
        case GET_ACCOUNTID_FAIL:
            return { loading: false, error: action.payload };
        case GET_ACCOUNTID_RESET:
            return {loading : false, error: action.payload}
        default:
            return state;
    }
}

export const ChangePassword = (state = {}, action) =>{
    switch(action.type){
        case CHANGE_PASSWORD_REQUEST:
            return { loading: true };
        case CHANGE_PASSWORD_SUCCESS:
            return { loading: false, success: action.payload };
        case CHANGE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        case CHANGE_PASSWORD_RESET:
            return {loading : false, error: action.payload}
        default:
            return state;
    }
}

export const ChangeInforReducer = (state = {}, action) =>{
    switch(action.type){
        case CHANGE_INFOR_REQUEST:
            return { loading: true };
        case CHANGE_INFOR_SUCCESS:
            return { loading: false, success: action.payload };
        case CHANGE_INFOR_FAIL:
            return { loading: false, error: action.payload };
        case CHANGE_INFOR_RESET:
            return {loading : false, error: action.payload}
        default:
            return state;
    }
}
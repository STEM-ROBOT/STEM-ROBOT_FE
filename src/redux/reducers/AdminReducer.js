import { ListAccount } from "../actions/AdminAction";
import { GET_ACCOUNT_FAIL, GET_ACCOUNT_RESET, GET_ACCOUNT_SUCCESS, GET_ACCOUNT_REQUEST, GET_GENRE_FAIL, GET_GENRE_REQUEST, GET_GENRE_RESET, GET_GENRE_SUCCESS, GET_ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_RESET, GET_ORDER_SUCCESS, ADD_GENRE_REQUEST, ADD_GENRE_SUCCESS, ADD_GENRE_FAIL, ADD_GENRE_RESET, UPDATE_GENRE_REQUEST, UPDATE_GENRE_SUCCESS, UPDATE_GENRE_FAIL, UPDATE_GENRE_RESET } from "../constants/AdminConstant"

export const ListAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACCOUNT_REQUEST:
            return { loading: true };
        case GET_ACCOUNT_SUCCESS:
            return { loading: false, success: action.payload };
        case GET_ACCOUNT_FAIL:
            return { loading: false, error: action.payload };
        case GET_ACCOUNT_RESET:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}
export const ListGenreReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_GENRE_REQUEST:
            return { loading: true };
        case GET_GENRE_SUCCESS:
            return { loading: false, success: action.payload };
        case GET_GENRE_FAIL:
            return { loading: false, error: action.payload };
        case GET_GENRE_RESET:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}
export const ListOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { loading: true };
        case GET_ORDER_SUCCESS:
            return { loading: false, success: action.payload };
        case GET_ORDER_FAIL:
            return { loading: false, error: action.payload };
        case GET_ORDER_RESET:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const addGenreReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_GENRE_REQUEST:
            return { loading: true };
        case ADD_GENRE_SUCCESS:
            return { loading: false, success: true };
        case ADD_GENRE_FAIL:
            return { loading: false, error: action.payload };
        case ADD_GENRE_RESET:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const updateGenreReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GENRE_REQUEST:
            return { loading: true };
        case UPDATE_GENRE_SUCCESS:
            return { loading: false, success: true };
        case UPDATE_GENRE_FAIL:
            return { loading: false, error: true };
        case UPDATE_GENRE_RESET:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}
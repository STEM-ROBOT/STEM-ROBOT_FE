import { ADD_LOCATION_FAIL, ADD_LOCATION_REQUEST, ADD_LOCATION_RESET, ADD_LOCATION_SUCCESS, GET_LOCATION_FAIL, GET_LOCATION_REQUEST, GET_LOCATION_RESET, GET_LOCATION_SUCCESS } from "../constants/LocationConstant";

export const getLoctionReducer = (state = {listLocation:[]}, action) => {
    switch (action.type) {
        case GET_LOCATION_REQUEST:
            return { loading: true };
        case GET_LOCATION_SUCCESS:
            return { loading: false, listLocation:action.payload };
        case GET_LOCATION_FAIL:
            return { loading: false, error: action.payload };
        case GET_LOCATION_RESET:
            return {};
        default:
            return state;
    }
};

export const addLoctionReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_LOCATION_REQUEST:
            return { loading: true };
        case ADD_LOCATION_SUCCESS:
            return { loading: false, success:true };
        case ADD_LOCATION_FAIL:
            return { loading: false, error: action.payload };
        case ADD_LOCATION_RESET:
            return {};
        default:
            return state;
    }
};
import { ADD_SCHEDULE_REFEREE_FAIL, ADD_SCHEDULE_REFEREE_REQUEST, ADD_SCHEDULE_REFEREE_RESET, ADD_SCHEDULE_REFEREE_SUCCESS, CREATE_REFEREE_FAIL, CREATE_REFEREE_REQUEST, CREATE_REFEREE_RESET, CREATE_REFEREE_SUCCESS, GET_FREETIME_REFEREE_FAIL, GET_FREETIME_REFEREE_REQUEST, GET_FREETIME_REFEREE_RESET, GET_FREETIME_REFEREE_SUCCESS, GET_REFEREE_FAIL, GET_REFEREE_REQUEST, GET_REFEREE_RESET, GET_REFEREE_SUCCESS, GET_SCHEDULE_REFEREE_FAIL, GET_SCHEDULE_REFEREE_REQUEST, GET_SCHEDULE_REFEREE_RESET, GET_SCHEDULE_REFEREE_SUCCESS } from "../constants/RefereeConstant";

export const getRefereeReducer = (state = { listReferee: [] }, action) => {
    switch (action.type) {
        case GET_REFEREE_REQUEST:
            return { loading: true };
        case GET_REFEREE_SUCCESS:
            return { loading: false, listReferee: action.payload };
        case GET_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case GET_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};


export const createRefereeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REFEREE_REQUEST:
            return { loading: true };
        case CREATE_REFEREE_SUCCESS:
            return { loading: false, success:true };
        case CREATE_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};

export const getFreeTimeRefereeReducer = (state = { listRefereefreetime: [] }, action) => {
    switch (action.type) {
        case GET_FREETIME_REFEREE_REQUEST:
            return { loading: true };
        case GET_FREETIME_REFEREE_SUCCESS:
            return { loading: false, listRefereefreetime: action.payload };
        case GET_FREETIME_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case GET_FREETIME_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};


export const addScheduleRefereeReducer = (state = { }, action) => {
    switch (action.type) {
        case ADD_SCHEDULE_REFEREE_REQUEST:
            return { loading: true };
        case ADD_SCHEDULE_REFEREE_SUCCESS:
            return { loading: false, success:true};
        case ADD_SCHEDULE_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case ADD_SCHEDULE_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};

export const getScheduleRefereeReducer = (state = { listRefereeSchedule: [] }, action) => {
    switch (action.type) {
        case GET_SCHEDULE_REFEREE_REQUEST:
            return { loading: true };
        case GET_SCHEDULE_REFEREE_SUCCESS:
            return { loading: false, listRefereeSchedule: action.payload };
        case GET_SCHEDULE_REFEREE_FAIL:
            return { loading: false, error: action.payload };
        case GET_SCHEDULE_REFEREE_RESET:
            return {};
        default:
            return state;
    }
};
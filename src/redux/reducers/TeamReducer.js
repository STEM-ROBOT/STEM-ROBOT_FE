import { ADD_TEAM_ASSIGN_MATCH_FAIL, ADD_TEAM_ASSIGN_MATCH_REQUEST, ADD_TEAM_ASSIGN_MATCH_RESET, ADD_TEAM_ASSIGN_MATCH_SUCCESS, ADD_TEAM_KNOCKOUT_FAIL, ADD_TEAM_KNOCKOUT_REQUEST, ADD_TEAM_KNOCKOUT_RESET, ADD_TEAM_KNOCKOUT_SUCCESS, ADD_TEAM_TABLE_FAIL, ADD_TEAM_TABLE_REQUEST, ADD_TEAM_TABLE_RESET, ADD_TEAM_TABLE_SUCCESS, ADD_TIME_ASSIGN_MATCH_FAIL, ADD_TIME_ASSIGN_MATCH_REQUEST, ADD_TIME_ASSIGN_MATCH_RESET, ADD_TIME_ASSIGN_MATCH_SUCCESS, GET_TEAM_ASSIGN_MATCH_FAIL, GET_TEAM_ASSIGN_MATCH_REQUEST, GET_TEAM_ASSIGN_MATCH_RESET, GET_TEAM_ASSIGN_MATCH_SUCCESS, GET_TEAM_KNOCKOUT_FAIL, GET_TEAM_KNOCKOUT_REQUEST, GET_TEAM_KNOCKOUT_RESET, GET_TEAM_KNOCKOUT_SUCCESS, GET_TEAM_MATCH_GROUP_FAIL, GET_TEAM_MATCH_GROUP_REQUEST, GET_TEAM_MATCH_GROUP_RESET, GET_TEAM_MATCH_GROUP_SUCCESS, GET_TEAM_TABLE_FAIL, GET_TEAM_TABLE_REQUEST, GET_TEAM_TABLE_RESET, GET_TEAM_TABLE_SUCCESS, GET_TEAMS_FAIL, GET_TEAMS_REGISTER_FAIL, GET_TEAMS_REGISTER_REQUEST, GET_TEAMS_REGISTER_RESET, GET_TEAMS_REGISTER_SUCCESS, GET_TEAMS_REQUEST, GET_TEAMS_RESET, GET_TEAMS_SUCCESS } from "../constants/TeamConstant";


export const getTeamsReducer = (state = { listTeam: [] }, action) => {
    switch (action.type) {
        case GET_TEAMS_REQUEST:
            return { loading: true };
        case GET_TEAMS_SUCCESS:
            return { loading: false, listTeam: action.payload };
        case GET_TEAMS_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAMS_RESET:
            return {};
        default:
            return state;
    }
};


export const addTeamKnockoutReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TEAM_KNOCKOUT_REQUEST:
            return { loading: true };
        case ADD_TEAM_KNOCKOUT_SUCCESS:
            return { loading: false, listTeam: action.payload };
        case ADD_TEAM_KNOCKOUT_FAIL:
            return { loading: false, error: action.payload };
        case ADD_TEAM_KNOCKOUT_RESET:
            return {};
        default:
            return state;
    }
};

export const getTeamknockoutReducer = (state = { listTeams: [] }, action) => {
    switch (action.type) {
        case GET_TEAM_KNOCKOUT_REQUEST:
            return { loading: true };
        case GET_TEAM_KNOCKOUT_SUCCESS:
            return { loading: false, listTeams: action.payload };
        case GET_TEAM_KNOCKOUT_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAM_KNOCKOUT_RESET:
            return {};
        default:
            return state;
    }
};

export const getTeamTableReducer = (state = { listTeams: [] }, action) => {
    switch (action.type) {
        case GET_TEAM_TABLE_REQUEST:
            return { loading: true };
        case GET_TEAM_TABLE_SUCCESS:
            return { loading: false, listTeams: action.payload };
        case GET_TEAM_TABLE_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAM_TABLE_RESET:
            return {};
        default:
            return state;
    }
};

export const addTeamTableReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TEAM_TABLE_REQUEST:
            return { loading: true };
        case ADD_TEAM_TABLE_SUCCESS:
            return { loading: false, success:true};
        case ADD_TEAM_TABLE_FAIL:
            return { loading: false, error: action.payload };
        case ADD_TEAM_TABLE_RESET:
            return {};
        default:
            return state;
    }
};

export const getTeamMatchReducer = (state = {listTeamMatch:[]}, action) => {
    switch (action.type) {
        case GET_TEAM_MATCH_GROUP_REQUEST:
            return { loading: true };
        case GET_TEAM_MATCH_GROUP_SUCCESS:
            return { loading: false, listTeamMatch:action.payload};
        case GET_TEAM_MATCH_GROUP_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAM_MATCH_GROUP_RESET:
            return {};
        default:
            return state;
    }
};

export const getTeamAssignMatchReducer = (state = {listTeamAssignMatch:[]}, action) => {
    switch (action.type) {
        case GET_TEAM_ASSIGN_MATCH_REQUEST:
            return { loading: true };
        case GET_TEAM_ASSIGN_MATCH_SUCCESS:
            return { loading: false, listTeamAssignMatch:action.payload};
        case GET_TEAM_ASSIGN_MATCH_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAM_ASSIGN_MATCH_RESET:
            return {};
        default:
            return state;
    }
};

export const addTeamAssignMatchReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TEAM_ASSIGN_MATCH_REQUEST:
            return { loading: true };
        case ADD_TEAM_ASSIGN_MATCH_SUCCESS:
            return { loading: false, success:true};
        case ADD_TEAM_ASSIGN_MATCH_FAIL:
            return { loading: false, error: action.payload };
        case ADD_TEAM_ASSIGN_MATCH_RESET:
            return {};
        default:
            return state;
    }
};

export const addTimeAssignMatchReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TIME_ASSIGN_MATCH_REQUEST:
            return { loading: true };
        case ADD_TIME_ASSIGN_MATCH_SUCCESS:
            return { loading: false, success:true};
        case ADD_TIME_ASSIGN_MATCH_FAIL:
            return { loading: false, error: action.payload };
        case ADD_TIME_ASSIGN_MATCH_RESET:
            return {};
        default:
            return state;
    }
};

export const getTeamRegisterReducer = (state = { listTeamRegister: [] }, action) => {
    switch (action.type) {
        case GET_TEAMS_REGISTER_REQUEST:
            return { loading: true };
        case GET_TEAMS_REGISTER_SUCCESS:
            return { loading: false, listTeamRegister: action.payload };
        case GET_TEAMS_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case GET_TEAMS_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

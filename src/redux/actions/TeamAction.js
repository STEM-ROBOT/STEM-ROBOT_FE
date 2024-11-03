import api from "../../config";
import { ADD_SCORE_REQUEST } from "../constants/ScoreConstant";
import { ADD_TEAM_KNOCKOUT_FAIL, ADD_TEAM_KNOCKOUT_REQUEST, ADD_TEAM_KNOCKOUT_SUCCESS, ADD_TEAM_TABLE_FAIL, ADD_TEAM_TABLE_REQUEST, ADD_TEAM_TABLE_SUCCESS, GET_TEAM_KNOCKOUT_FAIL, GET_TEAM_KNOCKOUT_REQUEST, GET_TEAM_KNOCKOUT_SUCCESS, GET_TEAM_MATCH_GROUP_FAIL, GET_TEAM_MATCH_GROUP_REQUEST, GET_TEAM_MATCH_GROUP_SUCCESS, GET_TEAM_TABLE_FAIL, GET_TEAM_TABLE_REQUEST, GET_TEAM_TABLE_SUCCESS, GET_TEAMS_FAIL, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS } from "../constants/TeamConstant";

export const getListTeam = (competitionId) => async (dispatch) => {
    try {
      dispatch({ type: GET_TEAMS_REQUEST });
  
      const { data } = await api.get(`/api/teams/bycompetition/${competitionId}`);
  
      dispatch({ type: GET_TEAMS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        // dispatch(logout());
      }
      dispatch({
        type: GET_TEAMS_FAIL,
        payload: message,
      });
    }
  };

  export const addTeamKnockout = (competitionId, listScore) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TEAM_KNOCKOUT_REQUEST });
        const { newdata } = await api.post(`api/scores/${competitionId}`,listScore);
        dispatch({ type: ADD_TEAM_KNOCKOUT_SUCCESS, payload: newdata });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            // dispatch(logout());
        }
        dispatch({
            type: ADD_TEAM_KNOCKOUT_FAIL,
            payload: message,
        });
    }
};


export const getListTeamsKnockout = (competitionId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEAM_KNOCKOUT_REQUEST });

    const { data } = await api.get(`/api/matches/get-round-knockout-late?CompetitionID=${competitionId}`);

    dispatch({ type: GET_TEAM_KNOCKOUT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_TEAM_KNOCKOUT_FAIL,
      payload: message,
    });
  }
};

export const getTeamsTable = (competitionId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEAM_TABLE_REQUEST });

    const { data } = await api.get(`/api/competitions/get-data-to-assing/${competitionId}`);

    dispatch({ type: GET_TEAM_TABLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_TEAM_TABLE_FAIL,
      payload: message,
    });
  }
};

export const AddTeamsTable = (competitionId,teamTable) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TEAM_TABLE_REQUEST });
    console.log(competitionId,teamTable)

    const { data } = await api.post(`api/competitions/config-teamtable-stagetable?competitionId=${competitionId}`,teamTable);

    dispatch({ type: ADD_TEAM_TABLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: ADD_TEAM_TABLE_FAIL,
      payload: message,
    });
  }
};

export const getTeamMatch = (competitionId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TEAM_MATCH_GROUP_REQUEST });

    const { data } = await api.get(`/api/matches/get-round-table?competitionID=${competitionId}`);

    dispatch({ type: GET_TEAM_MATCH_GROUP_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_TEAM_MATCH_GROUP_FAIL,
      payload: message,
    });
  }
};
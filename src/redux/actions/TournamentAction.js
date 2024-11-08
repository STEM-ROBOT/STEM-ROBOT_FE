import { CREATE_TOURNAMENT_FAIL, CREATE_TOURNAMENT_REQUEST, CREATE_TOURNAMENT_SUCCESS, GET_TOURNAMENT_INFO_FAIL, GET_TOURNAMENT_INFO_REQUEST, GET_TOURNAMENT_INFO_SUCCESS, GET_TOURNAMENT_MODERATOR_FAIL, GET_TOURNAMENT_MODERATOR_REQUEST, GET_TOURNAMENT_MODERATOR_SUCCESS } from "../constants/TournamentConstant";
import api from "/src/config";

export const getListTournament = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TOURNAMENT_MODERATOR_REQUEST });

    const { data } = await api.get("/api/tournaments/list-tournament-moderator");

    dispatch({ type: GET_TOURNAMENT_MODERATOR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      // dispatch(logout());
    }
    dispatch({
      type: GET_TOURNAMENT_MODERATOR_FAIL,
      payload: message,
    });
  }
};

export const getInfoTournament = (tournamentId) => async (dispatch) => {
  try {
    dispatch({ type: GET_TOURNAMENT_INFO_REQUEST });
    const { data } = await api.get(`/api/tournaments/${tournamentId}`);
    dispatch({ type: GET_TOURNAMENT_INFO_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_TOURNAMENT_INFO_FAIL,
      payload: message,
    });
  }
};

export const createTournament = (tournamnet,navigate) => async (dispatch) => {
  console.log(tournamnet)
  try {
    dispatch({ type: CREATE_TOURNAMENT_REQUEST });
    const { data } = await api.post(`/api/tournaments`,tournamnet);
    dispatch({ type: CREATE_TOURNAMENT_SUCCESS, payload: data });
    navigate("/account/mytournament");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_TOURNAMENT_FAIL,
      payload: message,
    });
  }
};

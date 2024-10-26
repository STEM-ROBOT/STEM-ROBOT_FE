import { GET_TOURNAMENT_MODERATOR_FAIL, GET_TOURNAMENT_MODERATOR_REQUEST, GET_TOURNAMENT_MODERATOR_SUCCESS } from "../constants/TournamentConstant";


export const getListTournament = () => async (dispatch) => {
    try {
      dispatch({ type: GET_TOURNAMENT_MODERATOR_REQUEST });
  
      const { data } = await api.get("/api/contestants");
  
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
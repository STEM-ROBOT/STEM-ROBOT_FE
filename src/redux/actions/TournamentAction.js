import { GET_TOURNAMENT_INFO_FAIL, GET_TOURNAMENT_INFO_REQUEST, GET_TOURNAMENT_INFO_SUCCESS, GET_TOURNAMENT_MODERATOR_FAIL, GET_TOURNAMENT_MODERATOR_REQUEST, GET_TOURNAMENT_MODERATOR_SUCCESS } from "../constants/TournamentConstant";
import api from "../../config";

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

  export const getInfoTournament = (tournamentId) => async (dispatch) => {
    try {
        dispatch({ type: GET_TOURNAMENT_INFO_REQUEST });
        console.log(api);
        const { data } = await api.get(`/api/tournaments/3`);
        console.log(data); // Kiểm tra xem dữ liệu trả về có đúng không

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
